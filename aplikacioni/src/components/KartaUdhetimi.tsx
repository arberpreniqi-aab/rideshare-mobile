import Link from "next/link";
import type { Udhetim } from "@/lib/udhetimet";

export function KartaUdhetimi({ udhetim }: { udhetim: Udhetim }) {
  return (
    <article className="trip-card">
      <h2>
        {udhetim.nisja} – {udhetim.destinacioni}
      </h2>

      <p>
        Ora: {udhetim.ora} · Vende të lira: {udhetim.vende}
      </p>
      {udhetim.vende === 0 && <p>Ska vende të lira</p>}

      <Link className="action" href={`/udhetimi/${udhetim.id}`}>
        Shiko detajet
      </Link>
    </article>
  );
}