import "server-only";
import { getSql } from "./db";
import { profiliIm } from "./lejet";

export type StatusiKerkeses = "ne_pritje" | "pranuar";

// Pamja që ky sesion ka të drejtë të shohë: shoferi pronar sheh kërkesat e udhëtimit të vet,
// udhëtari vetëm kërkesën e vet.
export type GjendjaEUdhetimit = {
  vende: number;
  roli: "pronar" | "udhetar" | "anonim";
  kerkesaIme: { id: string; statusi: StatusiKerkeses } | null;
  kerkesat: { id: string; emri: string; statusi: StatusiKerkeses }[];
};

export async function lexoGjendjen(udhetimId: string): Promise<GjendjaEUdhetimit | null> {
  const sql = getSql();
  const [u] = await sql`SELECT vende, shofer_id FROM udhetimet WHERE id = ${udhetimId}`;
  if (!u) return null;
  const p = await profiliIm();
  if (!p) return { vende: u.vende, roli: "anonim", kerkesaIme: null, kerkesat: [] };

  if (u.shofer_id === p.id) {
    const kerkesat = await sql`SELECT k.id::text AS id, pr.emri, k.statusi
      FROM kerkesat k JOIN profilet pr ON pr.github_id = k.udhetar_id
      WHERE k.udhetim_id = ${udhetimId} ORDER BY k.krijuar`;
    return { vende: u.vende, roli: "pronar", kerkesaIme: null, kerkesat: kerkesat as GjendjaEUdhetimit["kerkesat"] };
  }
  const [ime] = await sql`SELECT id::text AS id, statusi FROM kerkesat
    WHERE udhetim_id = ${udhetimId} AND udhetar_id = ${p.id}`;
  return { vende: u.vende, roli: "udhetar", kerkesaIme: (ime as GjendjaEUdhetimit["kerkesaIme"]) ?? null, kerkesat: [] };
}

// Udhëtari merret nga sesioni. UNIQUE (udhetim_id, udhetar_id) dhe ON CONFLICT bëjnë që
// një klikim i dytë të mos krijojë kërkesë të dytë. Shoferi nuk kërkon vend në udhëtimin e vet.
export async function dergoKerkesen(udhetimId: string): Promise<"ok" | "hyr" | "pa-vende" | "nuk-lejohet"> {
  const p = await profiliIm();
  if (!p) return "hyr";
  const sql = getSql();
  const [u] = await sql`SELECT vende, shofer_id FROM udhetimet WHERE id = ${udhetimId}`;
  if (!u || u.shofer_id === p.id) return "nuk-lejohet";
  if (u.vende <= 0) return "pa-vende";
  await sql`INSERT INTO kerkesat (udhetim_id, udhetar_id) VALUES (${udhetimId}, ${p.id})
    ON CONFLICT (udhetim_id, udhetar_id) DO NOTHING`;
  return "ok";
}

// Rregulli i pranimit jeton në databazë (funksioni prano_kerkesen në schema-java10.sql):
// vetëm pronari, vetëm një herë, dhe kurrë nën 0 vende.
export async function pranoKerkesen(kerkesaId: string) {
  const p = await profiliIm();
  if (!p) return "hyr";
  if (p.roli !== "shofer") return "ndaluar";
  if (!/^\d+$/.test(kerkesaId)) return "nuk-u-gjet";
  const sql = getSql();
  const [r] = await sql`SELECT prano_kerkesen(${kerkesaId}::bigint, ${p.id}) AS rezultati`;
  return r.rezultati as "pranuar" | "tashme" | "pa-vende" | "ndaluar" | "nuk-u-gjet";
}
