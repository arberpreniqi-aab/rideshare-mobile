"use client";
import { useState } from "react";

export default function Vendtakimi() {
  const [teksti, setTeksti] = useState("");
  const [vendtakimi, setVendtakimi] = useState("");
  const [gabim, setGabim] = useState("");
  const [gjendja, setGjendja] = useState("idle");
  const [mesazhi, setMesazhi] = useState("");
  const [saktesia, setSaktesia] = useState("");

  function kurMerretPozicioni(position: GeolocationPosition) {
    setGjendja("success");
    setMesazhi("Pozicioni u mor");
    setSaktesia(`Saktësia rreth ${Math.round(position.coords.accuracy)} m`);
  }

  function kurDeshtonLeximi(error: GeolocationPositionError) {
    if (error.code === 1) {
      setGjendja("denied");
      setMesazhi("Leja u refuzua. Shkruaj vendtakimin vetë.");
      return;
    }
        if (error.code === 3) {
      setGjendja("timeout");
      setMesazhi("Koha mbaroi. Provo sërish ose shkruaj vendtakimin vetë.");
      return;
    }

        if (error.code === 2) {
      setGjendja("unavailable");
      setMesazhi("Pozicioni nuk është i disponueshëm. Shkruaj vendtakimin vetë.");
      return;
    }
  }

  function kerkoVendndodhjen() {
    if (!navigator.geolocation) {
      setGjendja("unavailable");
      setMesazhi("Telefoni nuk e mbështet vendndodhjen. Shkruaj vendtakimin vetë.");
      return;
    }
    setGjendja("loading");
    setMesazhi("Po kërkojmë vendndodhjen…");
    setSaktesia("");
    navigator.geolocation.getCurrentPosition(
      kurMerretPozicioni,
      kurDeshtonLeximi,
      { timeout: 10000 }
    );
  }

  return (
    <section>
      <h2>Vendtakimi</h2>
      <label htmlFor="vendtakimi">Shkruaj vendtakimin</label>
      <input
        id="vendtakimi"
        data-testid="meeting-input"
        value={teksti}
        onChange={(e) => setTeksti(e.target.value)}
      />
      <button
        type="button"
        data-testid="confirm-meeting"
        onClick={() => {
          const pastruar = teksti.trim();
          if (pastruar === "") {
            setGabim("Shkruaj vendtakimin para se të konfirmosh.");
            return;
          }
          setGabim("");
          setVendtakimi(pastruar);
        }}
      >
        Konfirmo në telefon
      </button>
      <p data-testid="meeting-error">{gabim}</p>
      <p>
        Vendtakimi i konfirmuar:{" "}
        <strong data-testid="confirmed-meeting">{vendtakimi}</strong>
      </p>
      <button
        type="button"
        data-testid="locate-me"
        disabled={gjendja === "loading"}
        onClick={kerkoVendndodhjen}
      >
        Përdor vendndodhjen time
      </button>
      <p data-testid="location-status" data-state={gjendja}>{mesazhi}</p>
      <p data-testid="location-accuracy">{saktesia}</p>
    </section>
  );
}