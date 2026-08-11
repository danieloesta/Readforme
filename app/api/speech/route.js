import OpenAI from 'openai';
const client=new OpenAI({apiKey:process.env.OPENAI_API_KEY});

function chunks(t,max=3900){const out=[];let s=t.trim();while(s){if(s.length<=max){out.push(s);break}let i=s.lastIndexOf('\n',max);if(i<max*.55)i=s.lastIndexOf('. ',max);if(i<max*.55)i=max;out.push(s.slice(0,i+1).trim());s=s.slice(i+1).trim()}return out}

export async function POST(req){
 try{
  const {text}=await req.json();
  if(!text) return Response.json({error:'Ingen tekst at læse.'},{status:400});
  const parts=chunks(text);const buffers=[];
  for(const p of parts){
   const r=await client.audio.speech.create({model:'gpt-4o-mini-tts',voice:'marin',input:p,instructions:'Speak clear, natural Danish in a calm professional audiobook/news-reading style. Preserve the meaning and punctuation. Do not add anything.',response_format:'mp3'});
   buffers.push(Buffer.from(await r.arrayBuffer()));
  }
  return new Response(Buffer.concat(buffers),{headers:{'content-type':'audio/mpeg','cache-control':'no-store'}});
 }catch(e){console.error(e);return Response.json({error:'Kunne ikke lave oplæsningen.'},{status:500})}
}
