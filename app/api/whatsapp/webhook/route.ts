import { limitedBody } from '@/lib/server/body';
import { backend, failure } from '@/lib/server/firebase-admin';
import { canDecide, digest, validSignature } from '@/lib/server/contact-policy';
export const runtime='nodejs';
export async function GET(req: Request) {
  const url=new URL(req.url); const secret=process.env.WHATSAPP_VERIFY_TOKEN;
  if (secret && url.searchParams.get('hub.mode')==='subscribe' && url.searchParams.get('hub.verify_token')===secret) return new Response(url.searchParams.get('hub.challenge'));
  return new Response('Forbidden',{status:403});
}
export async function POST(req: Request) {
  let raw: string;
  try {raw=new TextDecoder().decode(await limitedBody(req,1000000));} catch {return new Response('Too large',{status:413});}
  if (raw.length>1000000) return new Response('Too large',{status:413});
  if (!validSignature(raw,req.headers.get('x-hub-signature-256'),process.env.META_APP_SECRET ?? '')) return new Response('Forbidden',{status:403});
  try {
    const payload=JSON.parse(raw); const {db}=backend();
    for (const entry of payload.entry ?? []) for (const change of entry.changes ?? []) {
      const value=change.value;
      if (entry.id!==process.env.WHATSAPP_BUSINESS_ACCOUNT_ID || value?.metadata?.phone_number_id!==process.env.WHATSAPP_PHONE_NUMBER_ID) continue;
      for (const message of value.messages ?? []) {
        const action=message.type==='button' ? message.button?.payload : message.type==='interactive' ? message.interactive?.button_reply?.id : '';
        const match=typeof action==='string' && action.match(/^(approve|decline):([a-f0-9]{64}):([a-f0-9]{64})$/);
        if (!match || typeof message.id!=='string') continue;
        const [,decision,id,token]=match; const ref=db.collection('contactRequests').doc(id);
        await db.runTransaction(async tx=>{
          const eventRef=db.collection('whatsappEvents').doc(digest(message.id));
          const [event,snapshot]=await Promise.all([tx.get(eventRef),tx.get(ref)]);
          if (event.exists || !snapshot.exists) return;
          const request=snapshot.data()!;
          const provider=(await tx.get(db.collection('privateProviders').doc(request.providerId))).data();
          // Meta retries non-2xx callbacks if a reply races the send acknowledgement.
          if (request.status==='queued' && request.expiresAt>Date.now() && provider?.whatsappSenderId===message.from && digest(token)===request.tokenHash) throw new Error('Awaiting send acknowledgement');
          if (!canDecide(request,provider,message,token,Date.now())) return;
          tx.create(eventRef,{requestId:id,processedAt:Date.now()});
          tx.update(ref,{status:decision==='approve'?'approved':'declined',decidedAt:Date.now(),accessExpiresAt:decision==='approve'?Date.now()+7*86400000:0});
        });
      }
    }
    return new Response('OK');
  } catch(error) {return failure(error);}
}
