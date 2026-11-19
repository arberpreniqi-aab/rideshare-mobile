"use server";

import { revalidatePath } from "next/cache";
import { ruajPreferimin } from "@/lib/preferimet";
import { dergoKerkesen, pranoKerkesen } from "@/lib/kerkesat";

export type PergjigjjaEPreferimit =
  | { ok: true; numri: number }
  | { ok: false; arsyeja: "hyr" | "nuk-u-gjet" | "gabim" };

export async function ruajUdhetimin(udhetimId: string): Promise<PergjigjjaEPreferimit> {
  try {
    const r = await ruajPreferimin(udhetimId);
    if (r === "hyr" || r === "nuk-u-gjet") return { ok: false, arsyeja: r };
    revalidatePath(`/udhetimi/${udhetimId}`);
    return { ok: true, numri: r.numri };
  } catch {
    return { ok: false, arsyeja: "gabim" };
  }
}


export async function kerkoVend(udhetimId: string) {
  try {
    return await dergoKerkesen(udhetimId);
  } catch {
    return "gabim" as const;
  }
}

export async function pranoKerkesenEUdhetarit(kerkesaId: string) {
  try {
    return await pranoKerkesen(kerkesaId);
  } catch {
    return "gabim" as const;
  }
}
