'use client';
import { useState } from 'react';
import { useAuth } from '@/contexts/auth-context';
export function ContactRequest({providerId}:{providerId:number}) {
  const {user}=useAuth(); const [result,setResult]=useState<{status?:string;error?:string;phoneNumber?:string;whatsappUrl?:string}>({}); const [busy,setBusy]=useState(false);
  async function run(create:boolean) {
    if (!user) return; setBusy(true);
    try {const response=await fetch('/api/contact-requests'+(create?'':`?providerId=${providerId}`),{method:create?'POST':'GET',headers:{Authorization:`Bearer ${await user.getIdToken()}`,'Content-Type':'application/json'},...(create?{body:JSON.stringify({providerId:String(providerId)})}:{})});setResult(await response.json());} catch {setResult({error:'Unable to check your request. Please try again.'});} finally {setBusy(false);}
  }
  const labels:Record<string,string>={queued:'Your request is queued. No message delivery has been confirmed.',pending:'Request sent. Waiting for the provider’s decision.',approved:'The provider approved sharing their contact details with you.',declined:'The provider declined this request.',expired:'This request or approval has expired.',cancelled:'This request was cancelled.',none:'You have not requested contact yet.'};
  return <div className="mt-4 space-y-3"><p className="text-sm">Request permission to view this provider’s number. They decide whether to share it with you.</p><div className="flex flex-wrap gap-2"><button disabled={busy} onClick={()=>run(true)} className="rounded-lg px-4 py-2 bg-primary text-primary-foreground disabled:opacity-50">Request contact</button><button disabled={busy} onClick={()=>run(false)} className="rounded-lg px-4 py-2 border border-border">Check request</button></div><p role="status" className="text-sm">{result.error || labels[result.status ?? '']}</p>{result.phoneNumber && <p className="text-sm break-all">{result.phoneNumber} · <a href={result.whatsappUrl} target="_blank" rel="noopener noreferrer" className="underline">Contact on WhatsApp</a></p>}</div>;
}
