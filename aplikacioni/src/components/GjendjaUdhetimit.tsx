"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { kerkoVend, pranoKerkesenEUdhetarit } from "@/app/udhetimi/[id]/actions";
import type { GjendjaEUdhetimit } from "@/lib/kerkesat";

const INTERVALI = 5000;

const statusiTekst = { ne_pritje: "Në pritje", pranuar: "U pranua" } as const;

// Të dy ekranet (shoferi dhe udhëtari) rilexojnë gjendjen nga serveri çdo 5 sekonda.
// Gjendja e treguar vjen gjithmonë nga përgjigjja e serverit, jo nga ekrani.
export function GjendjaUdhetimit({ udhetimId, fillestare }: {
  udhetimId: string;
  fillestare: GjendjaEUdhetimit;
}) {
  const [gjendja, setGjendja] = useState(fillestare);
  const [lidhja, setLidhja] = useState<"ok" | "rilidhje">("ok");
  const [duke, setDuke] = useState<string | null>(null); // veprimi që pret serverin
  const [mesazhi, setMesazhi] = useState("");
  const nePritje = useRef(false);
  const kontrolli = useRef<AbortController | null>(null);

  const lexo = useCallback(async () => {
    if (nePritje.current) return; // mos nis lexim të dytë ndërsa i pari pret
    nePritje.current = true;
    const ctrl = new AbortController();
    kontrolli.current = ctrl;
    try {
      const res = await fetch(`/api/udhetimi/${udhetimId}/gjendja`, { cache: "no-store", signal: ctrl.signal });
      if (!res.ok) throw new Error(String(res.status));
      const e = (await res.json()) as GjendjaEUdhetimit;
      if (!ctrl.signal.aborted) {
        setGjendja(e);
        setLidhja("ok"); // paralajmërimi hiqet vetëm pas një përgjigjeje të suksesshme
      }
    } catch {
      // Mbajmë vlerat e fundit dhe tregojmë që po rilidhemi; numri nuk bëhet zero.
      if (!ctrl.signal.aborted) setLidhja("rilidhje");
    } finally {
      nePritje.current = false;
    }
  }, [udhetimId]);

  useEffect(() => {
    const id = window.setInterval(lexo, INTERVALI);
    const kurKthehetRrjeti = () => { void lexo(); }; // pas rikthimit lexo menjëherë
    window.addEventListener("online", kurKthehetRrjeti);
    return () => {
      window.clearInterval(id);
      window.removeEventListener("online", kurKthehetRrjeti);
      kontrolli.current?.abort(); // përgjigjja e vjetër nuk e prek më faqen
    };
  }, [lexo]);

  async function kerko() {
    setDuke("kerko"); setMesazhi("");
    const r = await kerkoVend(udhetimId);
    setDuke(null);
    setMesazhi(r === "ok" ? "Kërkesa u dërgua." : r === "pa-vende" ? "Nuk ka vende të lira." : "Kërkesa nuk u dërgua. Provo përsëri.");
    await lexo();
  }

  async function prano(kerkesaId: string) {
    setDuke(kerkesaId); setMesazhi("");
    const r = await pranoKerkesenEUdhetarit(kerkesaId);
    setDuke(null);
    setMesazhi(r === "pranuar" ? "Pranimi u ruajt." : r === "tashme" ? "Kjo kërkesë është pranuar më parë."
      : r === "pa-vende" ? "Nuk ka më vende të lira." : "Pranimi nuk u ruajt. Provo përsëri.");
    await lexo();
  }

  const offline = lidhja === "rilidhje";
  const ime = gjendja.kerkesaIme;

  return (
    <section className="live" aria-label="Kërkesa për vend">
      <p>Vende të lira: <strong data-testid="vende">{gjendja.vende}</strong></p>

      {gjendja.roli === "anonim" && (
        <p><Link href="/panel">Hyr</Link> për të kërkuar një vend.</p>
      )}

      {gjendja.roli === "udhetar" && (
        <>
          <p>Kërkesa ime: <strong data-testid="kerkesa-ime">{ime ? statusiTekst[ime.statusi] : "Pa kërkesë"}</strong></p>
          {ime ? (
            <p>{ime.statusi === "pranuar" ? "Vendi u konfirmua." : "Kërkesa u dërgua. Pret shoferin."}</p>
          ) : (
            <button className="action" onClick={kerko} disabled={offline || duke !== null || gjendja.vende <= 0}>
              {duke === "kerko" ? "Po dërgohet…" : gjendja.vende <= 0 ? "Nuk ka vende të lira" : "Kërko një vend"}
            </button>
          )}
        </>
      )}

      {gjendja.roli === "pronar" && (
        <>
          <h2>Kërkesat për udhëtimin tim</h2>
          {gjendja.kerkesat.length === 0 && <p data-testid="pa-kerkesa">Ende pa kërkesë.</p>}
          <ul className="requests">
            {gjendja.kerkesat.map((k) => (
              <li key={k.id} data-testid="kerkese">
                <span>{k.emri} · <strong>{statusiTekst[k.statusi]}</strong></span>
                {k.statusi === "ne_pritje" && (
                  <button className="action" onClick={() => prano(k.id)}
                    disabled={offline || duke !== null || gjendja.vende <= 0}>
                    {duke === k.id ? "Po ruhet…" : "Prano kërkesën"}
                  </button>
                )}
              </li>
            ))}
          </ul>
        </>
      )}

      {mesazhi && <p role="status">{mesazhi}</p>}
      <p className="live__state" data-testid="lidhja">
        {offline
          ? "Po rilidhemi · të dhënat mund të jenë të vjetra. Veprimet që kërkojnë rrjet janë të bllokuara."
          : "Gjendja u lexua nga serveri · përditësim automatik çdo 5 sekonda"}
      </p>
    </section>
  );
}
