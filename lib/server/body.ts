export async function limitedBody(req: Request, maximum: number): Promise<Uint8Array> {
  if (Number(req.headers.get('content-length')) > maximum) throw new Error('Request too large');
  const reader=req.body?.getReader(); if (!reader) return new Uint8Array();
  const chunks:Uint8Array[]=[];let size=0;
  try {while(true){const {done,value}=await reader.read();if(done) break;size+=value.length;if(size>maximum){await reader.cancel();throw new Error('Request too large');}chunks.push(value);}} finally {reader.releaseLock();}
  const body=new Uint8Array(size);let offset=0;for(const chunk of chunks){body.set(chunk,offset);offset+=chunk.length;}return body;
}
