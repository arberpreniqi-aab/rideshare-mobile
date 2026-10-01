# RideShare — Java 3

## Çfarë ndërtova

Ndërtova faqen kryesore me tri karta udhëtimesh, faqen dinamike me detajet e udhëtimit dhe faqen e simulimit të kërkesës “Në pritje”.

## Provat që bëra

### Prova 1: Lista në telefon

Hapa faqen kryesore në pamjen e telefonit; prisja tri karta pa lëvizje anash; pashë tri karta dhe nuk kishte scroll horizontal.

### Prova 2: Detajet e udhëtimit të dytë

Klikova kartën 2; prisja adresën /udhetimi/2 dhe vendtakimin e saj; pashë Fushë Kosovë – AAB, orën 08:15, vendtakimin “Te stacioni kryesor” dhe 1 vend të lirë.

Shënova edhe se karta 3 kishte zero vende dhe butoni “Nuk ka vende të lira” ishte i çaktivizuar. Adresa /udhetimi/99 shfaqi “Udhëtimi nuk u gjet”.

### Prova 3: Kërkesa në pritje

Klikova “Kërko vend”; prisja “Simulim: Në pritje”, pa rezervim real; pashë mesazhin “Simulim: Në pritje”. Pastaj u ktheva te detajet dhe te lista pa problem.

## Çfarë do të përmirësoj

Javën tjetër dua të përmirësoj pamjen vizuale të kartave dhe ta lidh rrjedhën me ruajtjen reale të të dhënave.

## Ndihma nga AI (Artificial Intelligence – inteligjencë artificiale)

Përdora AI për të më ndihmuar me strukturën e faqeve në Next.js, komponentin KartaUdhetimi dhe rrugët dinamike me [id]. Funksionimin e aplikacionit e testova vetë në browser dhe verifikova të tri provat.