import { applicationDefault, getApps, initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import { getStorage } from 'firebase-admin/storage';
export function backend() {
  if (process.env.NEXT_PUBLIC_LOCAL_PREVIEW === 'true' || process.env.PRIVATE_WORKFLOWS_ENABLED !== 'true') throw new Error('unavailable');
  const app = getApps().find(app => app.name === 'private-workflows') ?? initializeApp({credential: applicationDefault(), projectId: process.env.GOOGLE_CLOUD_PROJECT, storageBucket: process.env.PRIVATE_STORAGE_BUCKET}, 'private-workflows');
  return {db:getFirestore(app),auth:getAuth(app),bucket:getStorage(app).bucket()};
}
export async function authenticate(req: Request) {
  const match = req.headers.get('authorization')?.match(/^Bearer (.+)$/);
  if (!match) throw new Error('unauthorized');
  const token = await backend().auth.verifyIdToken(match[1], true);
  return token.uid;
}
export function failure(error: unknown) {
  const unauthorized = error instanceof Error && error.message === 'unauthorized';
  return Response.json({error:unauthorized ? 'Please log in.' : 'This service is not available. Please try again later.'},{status:unauthorized ? 401 : 503,headers:{'Cache-Control':'no-store'}});
}
