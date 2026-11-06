import { createHash, createHmac, timingSafeEqual } from 'node:crypto';
export const digest = (value: string) => createHash('sha256').update(value).digest('hex');
export function validSignature(raw: string, signature: string | null, secret: string) {
  if (!secret || !signature || !/^sha256=[a-f0-9]{64}$/.test(signature)) return false;
  const expected = 'sha256=' + createHmac('sha256', secret).update(raw).digest('hex');
  return timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
}
export function canDecide(request: any, provider: any, message: any, token: string, now: number) {
  return request?.status === 'pending' && request.expiresAt > now && provider?.active === true &&
    provider.phoneVerified === true && provider.whatsappOptIn === true &&
    request.providerVersion === provider.contactVersion &&
    message.from === provider.whatsappSenderId && message.context?.id === request.messageId &&
    Number(message.timestamp) * 1000 >= request.createdAt - 60000 &&
    Number(message.timestamp) * 1000 <= now + 60000 && digest(token) === request.tokenHash;
}
export function canDisclose(request: any, provider: any, uid: string, now: number) {
  return request?.requesterId === uid && request.status === 'approved' && request.accessExpiresAt > now &&
    provider?.active === true && provider.phoneVerified === true && provider.whatsappOptIn === true &&
    request.providerVersion === provider.contactVersion;
}
