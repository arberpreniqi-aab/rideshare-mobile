# RideShare — Java 2

**Shkurtesat:** MVP (Minimum Viable Product – produkti minimal i përdorshëm); AI (Artificial Intelligence – inteligjencë artificiale).

## 1. Problemi

Studentët që udhëtojnë për në AAB shpesh nuk e dinë kush niset në të njëjtën orë dhe ka vende të lira në veturë. Informacioni zakonisht shpërndahet në biseda të ndryshme, prandaj udhëtarët dhe shoferët e kanë të vështirë ta gjejnë njëri-tjetrin në kohë.

## 2. Përdoruesit

- **Shoferi:** dëshiron të publikojë nisjen, orën dhe numrin e vendeve të lira, të shohë kërkesat e udhëtarëve dhe t'i konfirmojë ose refuzojë ato.
- **Udhëtari:** dëshiron të gjejë një udhëtim që i përshtatet, të shohë orën, vendtakimin dhe vendet e lira, pastaj të kërkojë një vend dhe të presë përgjigjen e shoferit.

## 3. Tri ekranet

1. **Lista e udhëtimeve:** shfaq udhëtimet e disponueshme, destinacionin, orën dhe numrin e vendeve të lira. Udhëtari zgjedh një udhëtim për të parë më shumë detaje.
2. **Detajet e udhëtimit:** shfaq destinacionin, orën, numrin e vendeve të lira dhe vendtakimin. Nga ky ekran udhëtari mund të shtypë butonin **“Kërko një vend”**.
3. **Kërkesa në pritje:** pasi dërgohet kërkesa, sistemi tregon se kërkesa është dërguar dhe se udhëtari duhet të presë konfirmimin ose refuzimin e shoferit.

## 4. MVP — vetëm tri veçori

Në versionin e parë duhet të funksionojnë vetëm këto tri veprime kryesore:

1. Shoferi publikon një udhëtim me orën dhe numrin e vendeve të lira.
2. Udhëtari zgjedh udhëtimin dhe kërkon një vend.
3. Shoferi e konfirmon ose e refuzon kërkesën dhe statusi ruhet në sistem.

## 5. Çfarë e lëmë për më vonë?

Për versionin e parë nuk na duhen ende:

1. Harta dhe ndjekja e lokacionit në kohë reale.
2. Pagesat brenda aplikacionit.

## 6. Si e provoj?

- Kur udhëtari shtyp **“Kërko një vend”**, duhet të krijohet vetëm një kërkesë dhe statusi i saj të shfaqet si **“Në pritje”** derisa shoferi të përgjigjet.
- Nëse shoferi e pranon kërkesën, statusi duhet të ndryshojë në **“E konfirmuar”** dhe numri i vendeve të lira duhet të zvogëlohet.
- Nëse shoferi e refuzon kërkesën, statusi duhet të ndryshojë në **“E refuzuar”**.
- Nëse nuk ka vende të lira, sistemi nuk duhet të lejojë krijimin ose konfirmimin e një kërkese tjetër për vend.

## 7. Prova me kolegun

Prova me kolegun nuk është zhvilluar ende. Para dorëzimit do t'i kërkoj një kolegu të kryejë detyrën **“gjej udhëtimin dhe kërko një vend”**, pa i dhënë udhëzime. Do të shënoj pikën ku ai ndalet ose pyet dhe do të ndryshoj një element të skicës që i shkakton paqartësi.

## 8. Ndihma nga AI

Përdora AI për të më ndihmuar në strukturimin dhe formulimin më të qartë të përgjigjeve për Java 2. Përmbajtjen e krahasova me materialin e ligjëratës, skicën e RideShare dhe kërkesat e shabllonit, duke kontrolluar që MVP-ja të mbetet vetëm me tri veçori kryesore dhe që rastet e testimit të jenë të provueshme.
