import { limitedBody } from '@/lib/server/body';
import sharp from 'sharp';
import { authenticate, backend, failure } from '@/lib/server/firebase-admin';
export const runtime='nodejs';
export async function POST(req: Request) {
  try {
    const uid=await authenticate(req);
    const body=await limitedBody(req,12*1024*1024);
    const form=await new Response(body as BodyInit,{headers:{'Content-Type':req.headers.get('content-type') ?? ''}}).formData(); const file=form.get('photo'); const id=form.get('recommendationId');
    if (!(file instanceof File) || file.size>10*1024*1024 || !['image/jpeg','image/png','image/webp'].includes(file.type) || typeof id!=='string' || !/^[a-zA-Z0-9]{1,128}$/.test(id)) return Response.json({error:'Choose a JPG, PNG or WebP up to 10 MB.'},{status:400});
    const {db,bucket}=backend(); const ref=db.collection('recommendations').doc(id); const record=(await ref.get()).data();
    if (record?.userId!==uid || record.status!=='pending') return Response.json({error:'Not permitted.'},{status:403});
    const image=sharp(Buffer.from(await file.arrayBuffer()),{limitInputPixels:25000000});
    const metadata=await image.metadata();
    if (!['jpeg','png','webp'].includes(metadata.format ?? '') || (metadata.pages ?? 1)>1) return Response.json({error:'Choose a single JPG, PNG or WebP photo.'},{status:400});
    const bytes=await image.rotate().resize(1200,1200,{fit:'inside',withoutEnlargement:true}).webp({quality:85}).toBuffer();
    const path=`private-recommendation-photos/${uid}/${id}.webp`;
    await bucket.file(path).save(bytes,{resumable:false,contentType:'image/webp',metadata:{cacheControl:'private, no-store'}});
    await ref.update({photoStoragePath:path,photoStatus:'awaiting-provider-consent-and-review'});
    return Response.json({saved:true},{headers:{'Cache-Control':'no-store'}});
  } catch(error) {return failure(error);}
}
export async function GET(req: Request) {
  try {
    const uid=await authenticate(req); const id=new URL(req.url).searchParams.get('recommendationId');
    if (!id || !/^[a-zA-Z0-9]{1,128}$/.test(id)) return new Response('Invalid request',{status:400});
    const {db,bucket}=backend();const record=(await db.collection('recommendations').doc(id).get()).data();
    const path=`private-recommendation-photos/${uid}/${id}.webp`;
    if (record?.userId!==uid || record.photoStoragePath!==path) return new Response('Not found',{status:404});
    const [bytes]=await bucket.file(path).download();
    return new Response(new Uint8Array(bytes),{headers:{'Content-Type':'image/webp','Cache-Control':'private, no-store','X-Content-Type-Options':'nosniff'}});
  } catch(error) {return failure(error);}
}
