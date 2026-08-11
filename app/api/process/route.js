import OpenAI from 'openai';
import {Readability} from '@mozilla/readability';
import {JSDOM} from 'jsdom';

const client=new OpenAI({apiKey:process.env.OPENAI_API_KEY});

export async function POST(req){
 try{
  const {mode,input}=await req.json();
  if(!input?.trim()) return Response.json({error:'Indsæt et link eller en tekst.'},{status:400});
  let source=input.trim(),title='Indsat tekst';
  if(mode==='link'){
   let u;
   try{u=new URL(source);if(!['http:','https:'].includes(u.protocol))throw 0}catch{return Response.json({error:'Linket er ikke gyldigt.'},{status:400})}
   const res=await fetch(u,{headers:{'user-agent':'Mozilla/5.0 ReadForMe/1.0'},redirect:'follow'});
   if(!res.ok) throw new Error('Artiklen kunne ikke hentes. Prøv at kopiere teksten ind i stedet.');
   const html=await res.text();
   const dom=new JSDOM(html,{url:u.toString()});
   const article=new Readability(dom.window.document).parse();
   if(!article?.textContent) throw new Error('Jeg kunne ikke finde selve artikelteksten. Prøv at kopiere teksten ind.');
   source=article.textContent;title=article.title||title;
  }
  if(source.length>50000) return Response.json({error:'Teksten er for lang til første version. Del den i to dele.'},{status:400});
  const out=await client.responses.create({model:'gpt-5-mini',instructions:'Translate the supplied text into natural Danish as faithfully and completely as possible. Do not summarize, omit, add commentary, or censor ordinary content. Preserve headings and paragraph order. If it is already Danish, reproduce it faithfully with only obvious extraction artifacts cleaned up. Output only the Danish text.',input:source});
  return Response.json({title,text:out.output_text});
 }catch(e){console.error(e);return Response.json({error:e.message||'Der opstod en fejl.'},{status:500})}
}
