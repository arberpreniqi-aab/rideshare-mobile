# PRD (Product Requirements Document) — AAB StudyRoom

**Shkurtesat:** PWA (Progressive Web App – aplikacion web progresiv); PRD (Product Requirements Document – dokumenti i kërkesave të produktit); MVP (Minimum Viable Product – produkti minimal i përdorshëm).  
**Kursi:** Programimi për Pajisje Mobile (2026/2027) • **Kolegji AAB**  
**Emri i Projektit:** AAB StudyRoom  
**Themeluesi / Ekipi:** Arbër Preniqi RE-65780/21  
**Data & Versioni:** Java 01 • Versioni 1.0 (Draft për MVP)

---

## 1. Përdoruesi dhe Problemi Real

- **Kush e përjeton dhimbjen?** Studentët e Kolegjit AAB që kanë nevojë për një hapësirë të lirë për studim individual, punë në grup ose përgatitje të prezantimeve.
- **Kur ndodh?** Kryesisht gjatë ditës, ndërmjet ligjëratave dhe në periudhat kur ka shumë studentë në kampus.
- **Si e zgjidhin sot?** Studentët kërkojnë fizikisht nga një sallë në tjetrën ose pyesin kolegët nëse një hapësirë është e lirë. Kjo u humb kohë dhe mund të shkaktojë që disa studentë të synojnë të njëjtën hapësirë në të njëjtën kohë.

## 2. Evidenca e Vëzhgimit

Për të verifikuar problemin do të zhvillohen së paku 3 biseda të shkurtra me studentë.

Pyetjet kryesore:

1. Sa shpesh ke nevojë për një hapësirë të lirë për të studiuar?
2. Si e gjen sot një sallë ose hapësirë të lirë?
3. Sa kohë humb mesatarisht duke kërkuar?
4. A do ta përdorje një aplikacion që të tregon hapësirat e lira dhe të lejon t'i rezervosh?

## 3. Hipoteza e Vlerës

> **Nëse** studentëve u ofrohet një Mobile PWA ku mund të shohin hapësirat e lira dhe të rezervojnë një hapësirë për një periudhë të caktuar,  
> **atëherë** ata do të humbin më pak kohë duke kërkuar salla dhe do të organizojnë më lehtë studimin individual ose punën në grup.

## 4. Rrjedha Kryesore e Përdoruesit (Core Flow — Max 5 Hapa)

1. **Kyçja:** Studenti kyçet me emailin institucional AAB.
2. **Shikimi:** Studenti shikon listën e hapësirave dhe statusin `E lirë / E rezervuar`.
3. **Zgjedhja:** Studenti zgjedh një hapësirë dhe intervalin kohor.
4. **Rezervimi:** Studenti shtyp butonin `[Rezervo]`.
5. **Konfirmimi:** Sistemi ruan rezervimin dhe hapësira shfaqet si e rezervuar për atë periudhë.

## 5. Kufijtë e MVP-së (Scope Contract)

### BRENDA MVP-së (Maksimumi 3 funksione)

1. Autentikimi me email institucional AAB.
2. Shfaqja e listës së hapësirave dhe disponueshmërisë së tyre.
3. Rezervimi dhe anulimi i një hapësire për një interval të caktuar kohor.

### JASHTË MVP-së

- Harta interaktive e kampusit.
- Navigimi GPS.
- Sistemi i chat-it.
- Pagesat.
- Rekomandimet me inteligjencë artificiale.

## 6. Kriteret e Pranimit (Acceptance Criteria)

- [ ] **AC-1:** Përdoruesi me email të vlefshëm institucional mund të kyçet në aplikacion.
- [ ] **AC-2:** Përdoruesi mund të shohë nëse një hapësirë është e lirë apo e rezervuar.
- [ ] **AC-3:** Kur përdoruesi rezervon një hapësirë, rezervimi ruhet në databazë.
- [ ] **AC-4:** Dy përdorues nuk mund ta rezervojnë të njëjtën hapësirë për të njëjtën periudhë kohore.
- [ ] **AC-5:** Përdoruesi mund ta anulojë rezervimin e tij.
- [ ] **AC-6:** Pas anulimit, hapësira bëhet përsëri e disponueshme.

## 7. Modeli Minimal i të Dhënave (Supabase PostgreSQL)

```sql
profiles (id, full_name, email)
rooms (id, name, location, capacity, status)
bookings (id, room_id, user_id, start_time, end_time, status, created_at)
```

## 8. Rreziku Kryesor që Duhet Testuar

- **Rreziku:** A kanë studentët nevojë mjaftueshëm shpesh për rezervimin e hapësirave që ta përdorin aplikacionin rregullisht?
- **Testi:** Do të intervistohen së paku 3–5 studentë dhe do t'u paraqitet një prototip i thjeshtë. Testi konsiderohet pozitiv nëse shumica e tyre e kanë përjetuar problemin, humbin kohë duke kërkuar hapësirë dhe thonë se do ta përdornin aplikacionin për të kontrolluar ose rezervuar një sallë.

---

## Profili për Vijueshmërinë

- **Emri i projektit:** AAB StudyRoom
- **Problemi:** Studentët nuk kanë një mënyrë të shpejtë për të parë dhe rezervuar hapësirat e lira për studim.
- **Përdoruesi kryesor:** Studentët e Kolegjit AAB.
- **Zgjidhja:** Mobile PWA që tregon hapësirat e disponueshme dhe mundëson rezervimin e tyre.
- **Vlera kryesore:** Kursim kohe dhe organizim më i mirë i hapësirave për studim.
- **3 funksionet e MVP-së:** Login me email AAB, shikimi i hapësirave të lira, rezervimi/anulimi i hapësirës.
- **Jashtë MVP-së:** Harta interaktive e kampusit dhe navigimi.
- **Teknologjia e propozuar:** Mobile PWA + Supabase + PostgreSQL.
- **Pyetja kryesore për validim:** A do ta përdorin studentët një aplikacion për të kontrolluar dhe rezervuar hapësirat e studimit para se të fillojnë t'i kërkojnë fizikisht?
