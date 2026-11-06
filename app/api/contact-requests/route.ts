import { limitedBody } from '@/lib/server/body';
import { randomBytes } from 'node:crypto';
import { authenticate, backend, failure } from '@/lib/server/firebase-admin';
import { canDisclose, digest } from '@/lib/server/contact-policy';
export const runtime = 'nodejs';
const json = (value: unknown, status=200) => Response.json(value,{status,headers:{'Cache-Control':'no-store'}});
export async function POST(req: Request) {
  try {
    const uid = await authenticate(req);
    const {providerId} = JSON.parse(new TextDecoder().decode(await limitedBody(req,4096)));
    if (typeof providerId !== 'string' || !/^\d{1,10}$/.test(providerId)) return json({error:'Invalid profile.'},400);
    const {db} = backend();
    const id = digest(uid + ':' + providerId);
    const ref = db.collection('contactRequests').doc(id);
    const result = await db.runTransaction(async tx => {
      const providerRef = db.collection('privateProviders').doc(providerId);
      const quotaRef = db.collection('contactQuotas').doc(digest(uid));
      const [existing,p,q] = await Promise.all([tx.get(ref),tx.get(providerRef),tx.get(quotaRef)]);
      const provider = p.data(); const now=Date.now(); const old=existing.data();
      if (!provider?.active || !provider.phoneVerified || !provider.whatsappOptIn || !provider.whatsappSenderId || !provider.contactVersion) return {error:'This provider is not ready for contact requests.'};
      // One request per user/provider. Re-requests require explicit server review.
      if (existing.exists) return {status:old!.status};
      const quota=q.data(); const today=new Date().toISOString().slice(0,10);
      if (quota?.day===today && quota.count>=5) return {error:'Daily request limit reached.'};
      const token=randomBytes(32).toString('hex');
      tx.create(ref,{requesterId:uid,providerId,providerVersion:provider.contactVersion,status:'queued',tokenHash:digest(token),createdAt:now,expiresAt:now+86400000});
      tx.create(db.collection('whatsappOutbox').doc(id),{requestId:id,providerId,requesterLabel:'HomeServyc member '+id.slice(0,8),token,status:'queued',createdAt:now});
      tx.set(quotaRef,{day:today,count:quota?.day===today ? quota.count+1 : 1});
      return {status:'queued'};
    });
    return json(result,'error' in result ? 409 : 200);
  } catch(error) { return failure(error); }
}
export async function GET(req: Request) {
  try {
    const uid=await authenticate(req); const providerId=new URL(req.url).searchParams.get('providerId');
    if (!providerId || !/^\d{1,10}$/.test(providerId)) return json({error:'Invalid profile.'},400);
    const {db}=backend();
    const result=await db.runTransaction(async tx=>{
      const r=(await tx.get(db.collection('contactRequests').doc(digest(uid+':'+providerId)))).data();
      const p=(await tx.get(db.collection('privateProviders').doc(providerId))).data();
      if (canDisclose(r,p,uid,Date.now()) && /^\+[1-9]\d{7,14}$/.test(p!.phoneNumber)) return {status:'approved',phoneNumber:p!.phoneNumber,whatsappUrl:'https://wa.me/'+p!.phoneNumber.slice(1)};
      return {status:r?.status==='approved' ? 'expired' : r && r.expiresAt<Date.now() ? 'expired' : r?.status ?? 'none'};
    });
    return json(result);
  } catch(error) {return failure(error);}
}
