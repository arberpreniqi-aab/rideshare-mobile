# RideShare — Java 8

## Çfarë ndërtova
Te detajet e udhëtimit Arta mund të lejojë vendndodhjen (allow location) dhe ta shohë rezultatin, si dhe ta shkruajë dhe ta konfirmojë vetë vendtakimin. Zgjedhja mbetet vetëm në ekranin e Artës; Dritoni ende nuk e merr vendtakimin.

## Provat që bëra
### Prova 1: Leja nuk kërkohet sapo hapet faqja.
Hapat: Hapa `http://localhost:3000/udhetimi/2` në kompjuter, pastaj klikova "Përdor vendndodhjen time" dhe e lejova vendndodhjen.
Pritshmëria: Faqja të hapet pa kërkuar leje dhe leja të kërkohet vetëm pas klikimit.
Vëzhgimi: Shfletuesi nuk pyeti për vendndodhje kur u hap faqja. Pas klikimit dhe lejimit doli "Pozicioni u mor" dhe "Saktësia rreth 68 m". Shkrova Parkingu, konfirmova dhe doli "Vendtakimi i konfirmuar: Parkingu".

### Prova 2: Refuzimi i lejes nuk e bllokon përdoruesin.
Hapat: Te cilësimet e faqes e bllokova Location, rifreskova dhe klikova "Përdor vendndodhjen time". Pastaj shkrova Biblioteka dhe konfirmova.
Pritshmëria: Të dalë mesazhi i refuzimit dhe vendtakimi manual të punojë.
Vëzhgimi: Doli "Leja u refuzua. Shkruaj vendtakimin vetë." dhe doli "Vendtakimi i konfirmuar: Biblioteka". Simulimin e timeout-it me buton të përkohshëm nuk e bëra; kodi 3 është në kod, por nuk e kam parë vetë në ekran.

### Prova 3: Dëshmitë në GitHub nuk tregojnë adresën time reale.
Hapat: Para Push-it u kërkuan koordinata dhe sekrete në skedarët që publikohen dhe u kontrollua që `.env.local` nuk dërgohet. Këtë kontroll e bëri Claude.
Pritshmëria: Të mos ketë koordinata reale, adresë ose sekrete.
Vëzhgimi: Nuk u gjetën. Në raport shënova vetëm saktësinë 68 m, që nuk tregon ku ndodhem. Nuk kam bërë pamje ekrani me koordinata.

## Ku gjendet puna
Repository: https://github.com/arberpreniqi-aab/rideshare-mobile

- `aplikacioni/src/components/Vendtakimi.tsx` — komponenti i vendtakimit
- `aplikacioni/src/app/udhetimi/[id]/page.tsx` — detajet që e përdorin komponentin
- `aplikacioni/src/app/java-08-test/page.tsx` — faqja e provës me të dhëna fiktive
- `mobile-week08.json` — konfigurimi i testit

Nuk e kam provuar vendndodhjen në Vercel.

## Çfarë mbetet për përmirësim
Nëse e shkruaj Biblioteka, e konfirmoj dhe bëj F5, ai vendtakim largohet, sepse ruhet vetëm në gjendjen lokale të faqes. Hapi i ardhshëm është ruajtja dhe dërgimi te shoferi, sepse tani Dritoni nuk e sheh vendtakimin.

## Ndihma nga AI (Artificial Intelligence – inteligjencë artificiale)
Përdora Claude (asistent AI). Pjesën më të madhe të kodit nuk e shkrova vetë: Claude shkroi `Vendtakimi.tsx` (fushën, konfirmimin, mesazhin për tekst bosh, funksionet e vendndodhjes dhe mesazhet e gabimit), e lidhi komponentin te detajet, krijoi `java-08-test/page.tsx` dhe `mobile-week08.json`, dhe rregulloi konfigurimin për provën në telefon. Unë e vendosa një pjesë të kodit në VS Code. Claude e formuloi këtë raport nga përgjigjet e mia dhe bëri Commit/Push.

Vetë i bëra provat në telefon dhe kompjuter dhe i tregova rezultatet. Duhet ende ta mësoj kodin që ta shpjegoj dhe ta ndryshoj vetë në klasë.

## Prova me një hyrje të re
Provën e bëra vetë, jo me koleg.
- Hyrja që provova: ndryshim vendtakimi pa konfirmim: pas Biblioteka shkrova Parkingu pa klikuar Konfirmo.
- Parashikimi im para klikimit: Të mbetet Biblioteka nëse e kemi konfirmuar më herët. Këtë e shkrova pas provës, jo para saj.
- Çfarë pashë realisht: Në provën e parë raportova se doli Parkingu; kur e përsërita me kujdes pa klikuar butonin, rreshti i konfirmuar tregoi Biblioteka.
- Skedari dhe funksioni që e shpjegojnë: `aplikacioni/src/components/Vendtakimi.tsx`, `onClick` i butonit Konfirmo; vetëm ai thërret `setVendtakimi`.
- Çfarë kuptova ose korrigjova: Shkrimi ndryshon `teksti`, ndërsa zgjedhja e konfirmuar ndryshon vetëm me klikim.

Këtë pjesë e shpjegoj në klasë. Kontrolli automatik nuk verifikon vërtetësinë e provës.
