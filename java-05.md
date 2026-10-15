# RideShare — Java 5 · Hyrja dhe lejet

## Çfarë ndërtova
Shtova hyrjen me GitHub (NextAuth 4 me OAuth App) dhe një panel ku shoferi ndryshon
orën e udhëtimit të vet.
- **Identiteti**: GitHub vërteton kush je; sesioni mban ID-në tënde GitHub
  (`session.user.id`), jo një vlerë nga formulari.
- **Roli**: ruhet në Neon te tabela `profilet` (`udhetar` ose `shofer`). Çdo hyrje e
  re fillon si `udhetar`; rolin `shofer` e cakton vetëm administratori në SQL Editor.
- **Pronësia**: kolona `shofer_id` te `udhetimet` tregon kujt i përket udhëtimi.
  `ndryshoOren` në server lejon `UPDATE` vetëm kur `shofer_id` është ID-ja e sesionit
  dhe roli në databazë është ende `shofer`.

## Provat që bëra
### Prova 1: Hyrja, rifreskimi dhe dalja
Para hyrjes `/panel` shfaqte "Lista është publike. Për panelin hyr me llogarinë tënde
GitHub." dhe butonin "Hyr me GitHub". Pas hyrjes u shfaq "Përshëndetje, arberpreniqi-aab.
Roli: udhetar." dhe ID-ja ime GitHub; pasi më caktuan si shofer, roli u bë "shofer".
Pas rifreskimit emri dhe roli mbetën. Pas klikimit "Dil", paneli kërkoi përsëri
"Hyr me GitHub".

### Prova 2: Shoferi ndryshon udhëtimin e vet
Si shofer i ID 2 vendosa 08:25 dhe klikova "Ruaj orën". Paneli shfaqi
"Ora u ruajt me sukses. Kontrollo listën dhe detajet." Lista tregoi
"Fushë Kosovë – AAB · Ora: 08:25", detajet e `/udhetimi/2` treguan "Ora: 08:25"
dhe në databazë ID 2 kishte `ora = 08:25`. E ktheva orën në 08:15 nga paneli dhe u ruajt sërish.

### Prova 3: Veprimi pa leje refuzohet
Në formularin e hapur ndryshova fushën e fshehur `id` nga 2 në 1 dhe klikova "Ruaj orën".
Paneli shfaqi "Nuk ke leje për këtë udhëtim. Ora nuk ndryshoi." Në Neon
`SELECT id, ora, shofer_id FROM udhetimet` tregoi që ID 1 mbeti 08:00 me pronar
`DEMO-SHOFER-2`, ndërsa ID 2 mbeti 08:15. Serveri nuk i beson ID-së së formularit
për pronësinë. Provat shtesë me heqjen e rolit dhe formularin e vjetër nuk i bëra.

## Ku gjendet puna
Repository: https://github.com/arberpreniqi-aab/rideshare-mobile

Skedarët e rinj ose të ndryshuar brenda `aplikacioni/`:
- `schema-java05.sql` — tabela `profilet` dhe kolona `shofer_id`
- `src/lib/auth.ts` — konfigurimi i NextAuth me GitHub
- `src/app/api/auth/[...nextauth]/route.ts` — rruga e hyrjes
- `src/components/Hyrja.tsx` — butonat Hyr / Dil
- `src/lib/lejet.ts` — `profiliIm` dhe `ndryshoOren` (kontrolli i lejeve në server)
- `src/app/panel/actions.ts` — veprimi i ruajtjes
- `src/app/panel/page.tsx` — paneli
- `src/app/page.tsx` — lidhja "Hyr / Paneli im"
- `package.json` — paketa `next-auth`

Demo në Vercel nuk e publikova këtë javë; provat u bënë lokalisht.

## Çfarë mbetet për përmirësim
Kërkesa për vend është ende simulim. Më pas do të shtoja ruajtjen e kërkesës në databazë,
që shoferi ta pranojë ose refuzojë kërkesën dhe vendet e lira të ulen vetëm pas pranimit.
Gjithashtu, formulari tani provon vetëm ID 2; shoferi duhet të shohë listën e udhëtimeve të veta.

## Ndihma nga AI (Artificial Intelligence – inteligjencë artificiale)
Përdora Claude (asistent AI) për të krijuar skedarët A–G sipas udhëzimeve, për të
ekzekutuar SQL-në në Neon dhe për të bërë provat. Vetë krijova OAuth App në GitHub,
vendosa Client ID dhe Client Secret te `.env.local` pa ia treguar AI-së, dhe hyra me
llogarinë time. Verifikova rezultatet në panel, listë, detaje dhe databazë.
