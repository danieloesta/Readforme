# Readforme

Mobil-først webapp: indsæt et artikel-link eller tekst, få hele teksten oversat til dansk og læst højt.

## Lokal start
1. `npm install`
2. Kopiér `.env.example` til `.env.local` og indsæt din OpenAI API-nøgle.
3. `npm run dev`
4. Åbn `http://localhost:3000`

## Deploy
Appen kræver server-side kode og kan derfor ikke køre fuldt på GitHub Pages. Deploy fx som en Next.js-app hos en hostingudbyder med serverless/Node-understøttelse. Sæt `OPENAI_API_KEY` som server-side environment variable. API-nøglen må aldrig lægges i browserkoden eller commits.

## Begrænsninger i v0.1
- Nogle betalingsmure og JavaScript-tunge artikelsider kan ikke udtrækkes; brug tekst-fanen som fallback.
- Tekster over 50.000 tegn skal foreløbig deles op.
- Lyd genereres efter oversættelsen; næste version kan streame/chunke afspilningen mere avanceret.
