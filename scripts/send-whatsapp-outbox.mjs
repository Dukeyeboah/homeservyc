// Run only after operator authorization and sandbox validation. Never auto-retry ambiguous sends.
import { initializeApp, applicationDefault } from 'firebase-admin/app';
import { getFirestore, FieldValue } from 'firebase-admin/firestore';
if (process.env.PRIVATE_WORKFLOWS_ENABLED!=='true' || process.env.WHATSAPP_SEND_ENABLED!=='true' || process.env.NEXT_PUBLIC_LOCAL_PREVIEW==='true') throw new Error('Sending disabled');
for (const key of ['GOOGLE_CLOUD_PROJECT','WHATSAPP_ACCESS_TOKEN','WHATSAPP_PHONE_NUMBER_ID','WHATSAPP_TEMPLATE_NAME','WHATSAPP_TEMPLATE_LANGUAGE','WHATSAPP_GRAPH_VERSION']) if (!process.env[key]) throw new Error('Missing configuration: '+key);
initializeApp({credential:applicationDefault()}); const db=getFirestore();
const jobs=await db.collection('whatsappOutbox').where('status','==','queued').limit(10).get();
for (const job of jobs.docs) {
  const data=await db.runTransaction(async tx=>{
    const fresh=(await tx.get(job.ref)).data(); if (fresh.status!=='queued') return;
    const ref=db.collection('contactRequests').doc(fresh.requestId);
    const request=(await tx.get(ref)).data(); const provider=(await tx.get(db.collection('privateProviders').doc(fresh.providerId))).data();
    if (!request || request.expiresAt<Date.now() || !provider?.active || !provider.phoneVerified || !provider.whatsappOptIn || provider.contactVersion!==request.providerVersion) {tx.update(job.ref,{status:'cancelled',token:FieldValue.delete()});tx.update(ref,{status:'cancelled'});return;}
    tx.update(job.ref,{status:'sending',startedAt:Date.now()});return {...fresh,phoneNumber:provider.phoneNumber};
  });
  if (!data) continue;
  try {
    const response=await fetch(`https://graph.facebook.com/${process.env.WHATSAPP_GRAPH_VERSION}/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`,{method:'POST',headers:{Authorization:`Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}`,'Content-Type':'application/json'},signal:AbortSignal.timeout(15000),body:JSON.stringify({messaging_product:'whatsapp',to:data.phoneNumber,type:'template',template:{name:process.env.WHATSAPP_TEMPLATE_NAME,language:{code:process.env.WHATSAPP_TEMPLATE_LANGUAGE},components:[{type:'body',parameters:[{type:'text',text:data.requesterLabel}]},...['approve','decline'].map((action,index)=>({type:'button',sub_type:'quick_reply',index:String(index),parameters:[{type:'payload',payload:`${action}:${data.requestId}:${data.token}`}]}))]}})});
    const result=await response.json(); if (!response.ok || !result.messages?.[0]?.id) throw new Error('send unconfirmed');
    const batch=db.batch();batch.update(job.ref,{status:'sent',token:FieldValue.delete()});batch.update(db.collection('contactRequests').doc(data.requestId),{status:'pending',messageId:result.messages[0].id});await batch.commit();
  } catch {await job.ref.update({status:'needs-review',token:FieldValue.delete()}); /* Do not resend: provider may already have received it. */}
}
