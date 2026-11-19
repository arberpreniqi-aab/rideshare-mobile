-- Java 10 · Dy ekrane, një gjendje. Ekzekuto në Neon SQL Editor, në databazën e RideShare.

-- Kërkesa e udhëtarit për një vend. Një udhëtar ka një kërkesë për një udhëtim.
CREATE TABLE IF NOT EXISTS kerkesat (
  id BIGSERIAL PRIMARY KEY,
  udhetim_id TEXT NOT NULL REFERENCES udhetimet (id) ON DELETE CASCADE,
  udhetar_id TEXT NOT NULL REFERENCES profilet (github_id) ON DELETE CASCADE,
  statusi TEXT NOT NULL DEFAULT 'ne_pritje' CHECK (statusi IN ('ne_pritje', 'pranuar')),
  krijuar TIMESTAMPTZ NOT NULL DEFAULT now(),
  perditesuar TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (udhetim_id, udhetar_id)
);

-- Pranimi në një hap: kërkesa bëhet "pranuar" dhe vendet ulen me një bashkë, ose asgjë.
-- FOR UPDATE i bllokon kërkesën dhe udhëtimin, prandaj dy pranime njëkohësisht nuk e ulin numrin dy herë
-- dhe vendet nuk bëhen kurrë negative.
CREATE OR REPLACE FUNCTION prano_kerkesen(p_kerkesa BIGINT, p_shofer TEXT) RETURNS TEXT
LANGUAGE plpgsql AS $$
DECLARE
  k kerkesat%ROWTYPE;
  u udhetimet%ROWTYPE;
BEGIN
  SELECT * INTO k FROM kerkesat WHERE id = p_kerkesa FOR UPDATE;
  IF NOT FOUND THEN RETURN 'nuk-u-gjet'; END IF;
  SELECT * INTO u FROM udhetimet WHERE id = k.udhetim_id FOR UPDATE;
  IF u.shofer_id IS DISTINCT FROM p_shofer THEN RETURN 'ndaluar'; END IF;
  IF k.statusi = 'pranuar' THEN RETURN 'tashme'; END IF;
  IF u.vende <= 0 THEN RETURN 'pa-vende'; END IF;
  UPDATE kerkesat SET statusi = 'pranuar', perditesuar = now() WHERE id = p_kerkesa;
  UPDATE udhetimet SET vende = vende - 1 WHERE id = u.id;
  RETURN 'pranuar';
END;
$$;

SELECT id, udhetim_id, statusi FROM kerkesat ORDER BY id;
