# RideShare — Java 10

## Çfarë ndërtova
Kërkesa për vend tani ruhet realisht në Neon (tabela kerkesat) dhe dy ekranet, shoferi dhe udhëtari, e rilexojnë gjendjen nga serveri çdo 5 sekonda pa Refresh manual. Te detajet e udhëtimit komponenti src/components/GjendjaUdhetimit.tsx thërret GET /api/udhetimi/[id]/gjendja; përgjigjja varet nga sesioni: shoferi pronar merr kërkesat e udhëtimit të vet, udhëtari vetëm kërkesën e vet dhe vendet e lira. Leximi nuk nis një lexim të dytë ndërsa i pari pret, anulohet kur largohesh nga faqja, dhe kur dështon mban vlerat e fundit me “Po rilidhemi”; pas rikthimit të rrjetit lexon menjëherë.

Pranimi bëhet nga shoferi pronar me funksionin prano_kerkesen në databazë: kërkesa bëhet “pranuar” dhe vendet ulen me një në të njëjtin hap, me rreshtat e bllokuar (FOR UPDATE), prandaj i njëjti pranim nuk numërohet dy herë dhe vendet nuk bëhen negative.

Ndryshimi ndaj javës 9: atje ruhej një preferim personal që e sheh vetëm përdoruesi; tani dy përdorues me sesione të ndryshme shohin të njëjtën gjendje të përbashkët dhe njëri e ndryshon atë që sheh tjetri. Butoni “Kërko vend” i javës 3 (simulim) u zëvendësua me kërkesën reale.

## Përgatitja e provës
- Udhëtimi 2 (Fushë Kosovë → AAB), i vendosur përkohësisht në 2 vende; shoferi pronar është llogaria ime (rol “shofer”).
- Udhëtari: një llogari prove fiktive (“Arta (provë)”), dhe për provën me 0 vende një e dytë (“Blerta (provë)”).
- Sesionet: dy kontekste të veçanta shfletuesi, si një dritare normale dhe një private, secili me sesionin e vet të RideShare.
- Për Rastin 3 shtova përkohësisht udhëtimin fiktiv ID 9 (Klinë → AAB, 2 vende).
- Pas provave i fshiva kërkesat, llogaritë e provës dhe udhëtimin 9, dhe e ktheva udhëtimin 2 në 1 vend.

## Provat që bëra
### Prova 1: Rasti 1 · Kërkesa mbërrin te shoferi
- Hapat: të dy dritaret hapën /udhetimi/2 me 2 vende; udhëtari klikoi “Kërko një vend”.
- Çfarë prisja: udhëtari sheh “Në pritje”; shoferi e sheh kërkesën në leximin e radhës; vendet mbeten 2.
- Çfarë pa realisht shoferi dhe udhëtari, pa Refresh: udhëtari pa menjëherë “Kërkesa ime: Në pritje”; shoferi pa “Arta (provë) · Në pritje” me butonin “Prano kërkesën” pas 4.6 sekondash, pa rifreskuar. Të dy treguan 2 vende.
- Ku e verifikova ruajtjen: në tabelën kerkesat u krijua rreshti (udhëtimi 2, statusi ne_pritje).

### Prova 2: Rasti 2 · Pranimi përditëson të dy ekranet
- Hapat dhe vendet para/pas: shoferi klikoi “Prano kërkesën”; nga 2 vende mbeti 1. Shoferi pa “Pranimi u ruajt.” dhe “U pranua”; udhëtari pa “U pranua” dhe 1 vend pas 5.1 sekondash, pa Refresh.
- Përsëritja e pranimit dhe prova me 0 vende: i njëjti pranim i dërguar dy herë njëkohësisht ktheu dy herë “tashme” dhe vendet mbetën 1. Një llogari që nuk është pronare mori “ndaluar”. Me 0 vende, një kërkesë e dytë mori “pa-vende”: statusi mbeti ne_pritje dhe vendet mbetën 0, jo -1. Te shoferi butoni i pranimit ishte i çaktivizuar.
- Çfarë pashë realisht te të dy përdoruesit: të dy treguan të njëjtin rezultat, 1 vend dhe statusin e pranuar.

### Prova 3: Rasti 3 · Ndërprerja dhe rilidhja
- ID-ja e udhëtimit të ri të provës, cila dritare ishte offline dhe si e provova: udhëtimi 9 me 2 vende. Udhëtari dërgoi kërkesën; pastaj vetëm dritarja e udhëtarit u vendos offline (si Network → Offline), ndërsa shoferi mbeti online dhe e pranoi.
- Pamja e fundit gjatë ndërprerjes: udhëtari mbajti pamjen e vjetër, 2 vende dhe “Në pritje”, me “Po rilidhemi · të dhënat mund të jenë të vjetra. Veprimet që kërkojnë rrjet janë të bllokuara.” Numri nuk u bë zero. Në server ndërkohë ishin 1 vend dhe “pranuar”.
- Çfarë ndryshoi pas rilidhjes: pas rikthimit të rrjetit, pa Refresh, udhëtari pa “U pranua” dhe 1 vend pas 0.8 sekondash, dhe paralajmërimi u hoq.

## Ku gjendet puna
- Migrimi: aplikacioni/schema-java10.sql (tabela kerkesat dhe funksioni prano_kerkesen)
- Leximi i gjendjes: aplikacioni/src/app/api/udhetimi/[id]/gjendja/route.ts dhe src/lib/kerkesat.ts (lexoGjendjen)
- Dërgimi dhe pranimi: src/lib/kerkesat.ts (dergoKerkesen, pranoKerkesen) dhe src/app/udhetimi/[id]/actions.ts
- Ekrani: src/components/GjendjaUdhetimit.tsx, i vendosur te src/app/udhetimi/[id]/page.tsx

## Prova me kolegun
Nuk e kam bërë ende me kolegun. Do ta provoj në klasë: kolegu zgjedh një udhëtim tjetër ose 0 vende, unë parashikoj rezultatin dhe tregoj funksionin prano_kerkesen dhe komponentin GjendjaUdhetimit.

## Çfarë mbetet për përmirësim
Leximi bëhet çdo 5 sekonda, prandaj ndryshimi arrin me vonesë deri në 5 sekonda dhe bën kërkesa edhe kur nuk ndryshon asgjë. Udhëtari ende nuk mund ta anulojë kërkesën dhe shoferi nuk mund ta refuzojë. Hapi tjetër është refuzimi dhe njoftimi kur shoferi përgjigjet.

## Ndihma nga AI (Artificial Intelligence – inteligjencë artificiale)
AI (Claude) projektoi tabelën dhe funksionin e pranimit, shkroi leximin, komponentin dhe veprimet, dhe i ekzekutoi tri provat në një shfletues automatik me dy sesione prove; të dhënat e provës u fshinë dhe udhëtimi 2 u kthye si ishte. Unë e kontrollova raportin. Pyetja e javës: një timer që lexon çdo 5 sekonda vetëm rilexon të dhënat; lejet, pranimi vetëm një herë dhe numri i vendeve mbrohen nga serveri dhe databaza.

## Pas dorëzimit të parë — përditëso më vonë
Ky seksion mund të mbetet kështu në dorëzimin e parë. Pasi të marrësh përgjigjen, shto linkun e Issue-t, commit-in e kontrolluar dhe çfarë kaloi ose duhet korrigjuar. 2/2 teknikisht nuk provon funksionimin e aplikacionit.
