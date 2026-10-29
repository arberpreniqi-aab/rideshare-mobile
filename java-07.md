# RideShare · Java 7

Ruaje si **java-07.md**, pranë README në rrënjën e repository-t tënd. Plotëso me vëzhgimet e tua dhe plotëso çdo vend bosh përpara dorëzimit. Ruaj titujt dhe etiketat. Para/Pas janë dy URL të plota commit-esh nga i njëjti repository, me kodin e plotë prej 40 shenjash.

Pas Commit dhe Push, hap formularin e lëndës për **Java 7** dhe vendos linkun kryesor të repository-t. Rezultati vjen te komenti **Kontrolli automatik i dorëzimit**, nga github-actions[bot], në Issue-n tënd. Lexo 5/5 dhe çdo ✅/❌; nëse korrigjon, bëj Push dhe komento **rikontrollo** te i njëjti Issue. 5/5 është kontroll teknik, jo notë.

## Rasti im
GitHub: arberpreniqi-aab
Kodi: P7-501
Skenari i zgjedhur (numri dhe titulli, nga Rastet 1–5): Rasti 2 · Pa vende
ID i udhëtimit në projektin tim: 3
Të dhënat fiktive të rastit: Pejë → AAB, 10:15, 1 vende. Ora për provën e re: 10:20.

## Parashikimi
Te detajet e udhëtimit ID 3 (Lipjan) s'ka vende të lira, prandaj pres që të dalë mesazhi që nuk ka vende të lira.

## Dy probleme
1. Te Lipjani nuk kishte vende të lira, por karta në listë dukej njësoj si të tjerat (i njëjti buton "Shiko detajet"); vetëm numri "0" e tregonte. E përsërita duke hapur localhost:3000 dhe duke krahasuar tri kartat.
2. Kur hapa direkt /udhetimi/3/kerkesa doli vetëm titulli "Nuk ka vende të lira." dhe lidhja "← Kthehu te detajet", pa shpjegim dhe pa lidhje te lista.

## Korrigjimi
Skedari: aplikacioni/src/components/KartaUdhetimi.tsx
[PLOTËSO] Çfarë bën ky skedar, çfarë ndryshove dhe pse?

## Versionet
Para: https://github.com/arberpreniqi-aab/rideshare-mobile/commit/bd5fcfd30f9ab0ea1fc919a7bc255b1f397e3ebb
Pas: https://github.com/arberpreniqi-aab/rideshare-mobile/commit/2124c34a78b17caac7fea086dfb439f0ab71803a

## Provat që bëra
### Prova 1
Hapat: Hapa localhost:3000, te karta Lipjan – AAB (ID 3) klikova "Shiko detajet", pastaj hapa direkt /udhetimi/3/kerkesa.
Pritshmëria: Te detajet e ID 3 të dalë që nuk ka vende të lira.
Vëzhgimi: Te lista karta e Lipjanit dukej njësoj si të tjerat, vetëm me "Vende të lira: 0". Te detajet: Ora 07:45, Vendtakimi: Qendra e qytetit, Vende të lira: 0 dhe butoni gri "Nuk ka vende të lira" i çaktivizuar. Te /udhetimi/3/kerkesa doli vetëm titulli "Nuk ka vende të lira." dhe lidhja "← Kthehu te detajet". Asnjë rezervim nuk u konfirmua; kërkesa mbetet simulim.

### Prova 2
Hapat: Pas ndryshimit në KartaUdhetimi.tsx ruajta skedarin dhe rifreskova localhost:3000.
Pritshmëria: Te karta e Lipjanit të dalë teksti "Ska vende të lira", te Prishtina dhe Fushë Kosova jo.
Vëzhgimi: Te karta e Lipjanit doli "Ska vende të lira" nën "Ora: 07:45 · Vende të lira: 0". Prishtina (2 vende) dhe Fushë Kosova (1 vend) nuk e kishin tekstin.

### Prova 3
Hapat: Ndryshova përkohësisht në Neon vendet e ID 2 (Fushë Kosovë) nga 1 në 0 dhe rifreskova listën. Pastaj i ktheva në 1.
Pritshmëria: Prisja që Fushë Kosova të kishte ende vende të lira.
Vëzhgimi: Karta e Fushë Kosovës tregoi "Ora: 08:15 · Vende të lira: 0" dhe tekstin "Ska vende të lira". Parashikimi im doli gabim: kushti kontrollon numrin e vendeve nga databaza, prandaj teksti del për çdo udhëtim që ka 0 vende, jo vetëm për Lipjanin.

## Ndryshimi i ri
Nuk e kam demonstruar ende me një koleg. Hyrjen e ndryshova vetë te Prova 3 (ID 2 me 0 vende): parashikova që të kishte vende të lira, por doli "Ska vende të lira", sepse kushti varet vetëm nga numri i vendeve. Do ta demonstroj në takimin e radhës.

## Ndihma nga AI
Përdora Claude (asistent AI) për: nisjen e serverit, gjenerimin e rastit dhe ruajtjen e modelit të raportit, sugjerimin se ku të kërkoj probleme dhe në cilin skedar, sugjerimin e formës së kushtit `{udhetim.vende === 0 && <p>…</p>}` dhe rregullimin e një gabimi kur kopjova edhe numrat e rreshtave. Claude bëri gjithashtu Commit/Push, ndryshoi përkohësisht vendet e ID 2 në Neon për Prova 3 dhe më ndihmoi t'i shkruaj provat nga vëzhgimet e mia. Parashikimet dhe tekstin "Ska vende të lira" i shkrova vetë; rreshtin në KartaUdhetimi.tsx e shtova vetë në VS Code dhe e provova në shfletues.
