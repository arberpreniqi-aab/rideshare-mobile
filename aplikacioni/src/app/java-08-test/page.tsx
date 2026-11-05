import Vendtakimi from "@/components/Vendtakimi";

// Faqe prove pa hyrje dhe pa databazë: përdor të njëjtin komponent si detajet.
const udhetimi = { nisja: "Ferizaj", destinacioni: "AAB", ora: "08:15", shoferi: "Dritoni" };

export default function Java08Test() {
  return (
    <main>
      <h1>{udhetimi.nisja} – {udhetimi.destinacioni}</h1>
      <p>Shoferi: {udhetimi.shoferi} · Ora: {udhetimi.ora}</p>
      <Vendtakimi />
    </main>
  );
}
