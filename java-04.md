# RideShare — Java 4 · Neon dhe PostgreSQL

## Çfarë ndërtova
Lidha aplikacionin RideShare me databazën Neon (PostgreSQL) përmes Vercel.
Krijova tabelën `udhetimet` me tri udhëtime fiktive në Neon SQL Editor.
Funksionet `lexoUdhetimet` dhe `gjejUdhetimin` në `src/lib/udhetimet.ts` tani janë
`async` dhe e lexojnë udhëtimin me SQL përmes `src/lib/db.ts`, i cili e përdor
`DATABASE_URL` vetëm në server (`server-only`). Lista, detajet dhe faqja e kërkesës
presin përgjigjen e databazës dhe janë `force-dynamic`, prandaj lexojnë të dhëna
të reja në çdo rifreskim.

## Provat që bëra
### Prova 1: Ndryshimi në databazë shfaqet në aplikacion
Ndryshova orën e ID 2 nga 08:15 në 08:25 në SQL Editor (`UPDATE 1`).
Pas rifreskimit, karta "Fushë Kosovë – AAB" në listë tregoi "Ora: 08:25" dhe
detajet e `/udhetimi/2` treguan gjithashtu "Ora: 08:25", pa ndryshuar kodin.
E ktheva orën në 08:15; të dyja faqet treguan sërish 08:15.
ID 3 (Lipjan) ende ka 0 vende dhe shfaq "Nuk ka vende të lira";
ID 99 shfaq "Udhëtimi nuk u gjet".

### Prova 2: Lista bosh dhe rikthimi
Shtova `WHERE false` vetëm te pyetja e `lexoUdhetimet`. Lista shfaqi
"Nuk ka udhëtime për momentin." — nuk u fshi asnjë rresht dhe nuk doli gabim lidhjeje.
Hoqa `WHERE false`, ruajta dhe rifreskova: u kthyen tri kartat.

### Prova 3: Lidhja mungon, rikthimi dhe siguria
Ndryshova përkohësisht emrin `DATABASE_URL` në `DATABASE_URL_PA_TEST` në `.env.local`
dhe rinisa serverin. Lista dhe detajet shfaqën
"Nuk u lidhëm me databazën. Provo përsëri."
Riktheva emrin `DATABASE_URL`, rinisa serverin dhe aplikacioni punoi sërish me tri kartat.
`.env.local` nuk shfaqet në listën e ndryshimeve të GitHub Desktop, sepse `.gitignore` ka `.env*`.

## Ku gjendet puna
- `aplikacioni/schema.sql` — tabela `udhetimet` dhe tri udhëtimet
- `aplikacioni/src/lib/db.ts` — lidhja private me Neon (skedar i ri)
- `aplikacioni/src/lib/udhetimet.ts` — leximi me SQL
- `aplikacioni/src/app/page.tsx` — lista
- `aplikacioni/src/app/udhetimi/[id]/page.tsx` — detajet
- `aplikacioni/src/app/udhetimi/[id]/kerkesa/page.tsx` — simulimi i kërkesës
- `aplikacioni/package.json` — paketat `@neondatabase/serverless` dhe `server-only`

Repository: https://github.com/arberpreniqi-aab/rideshare-mobile

## Çfarë mbetet për përmirësim
Kërkesa “Në pritje” mbetet simulim; nuk ka rezervim real dhe numri i vendeve nuk zvogëlohet.
Hapi i ardhshëm: ruajtja e kërkesës në databazë dhe ulja e vendeve të lira kur shoferi e konfirmon.
Gjithashtu, publikimi në Vercel duhet të bëjë Redeploy që Production të përdorë Neon.

## Ndihma nga AI (Artificial Intelligence – inteligjencë artificiale)
Përdora Claude (asistent AI) për të krijuar skedarët sipas udhëzimeve të ushtrimit,
për të lidhur Neon me Vercel dhe për të ekzekutuar provat. Verifikova vetë që lista dhe
detajet ndryshojnë pas `UPDATE` në Neon, që shfaqen mesazhet e listës bosh dhe të gabimit
të lidhjes, dhe që `.env.local` nuk shkon në GitHub. Connection string-un e vendosa vetë
dhe nuk ia dhashë AI-së.
