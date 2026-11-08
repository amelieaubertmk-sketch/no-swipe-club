import { Sun } from "lucide-react";
import { Link } from "react-router-dom";
import { missions, tracks, trackText } from "../data/content";
import { personalize } from "../lib/engine";

import { useStore } from "../app/store";
import { Button } from "../components/UI";
export function Result() {
  const { state } = useStore();
  const profile = personalize(state.answers);
  return (
    <section className="result section">
      <span className="eyebrow">TON POINT DE DÉPART</span>
      <Sun size={52} strokeWidth={1} />
      <h1>
        Un nouvel élan.
        <br />
        <em>À ta façon.</em>
      </h1>
      <p>
        Ton parcours met l’accent sur{" "}
        {profile.primary === "RESTART"
          ? "du temps pour toi et une reprise progressive"
          : profile.primary === "CONFIDENCE"
            ? "des expériences sociales progressives"
            : "des occasions de rencontres autour de tes intérêts"}
        .
      </p>
      <div className="score-grid">
        {tracks.map((t) => (
          <article key={t}>
            <span>
              {t}
              {profile.primary === t
                ? " · PRINCIPAL"
                : profile.secondary.includes(t)
                  ? " · SECONDAIRE"
                  : ""}
            </span>
            <strong>
              {profile.scores[t]}
              <small>/100</small>
            </strong>
            <progress max={100} value={profile.scores[t]} />
            <p>{trackText[t]}</p>
          </article>
        ))}
      </div>
      <p className="muted">
        Ces indices servent à choisir tes missions. Ce ne sont pas des
        évaluations psychologiques.
      </p>
      <div className="three-cols summary">
        <article>
          <h3>Tes forces</h3>
          <p>
            {Array.isArray(state.answers.passions)
              ? `Tu as identifié ${state.answers.passions.length} centre(s) d’intérêt : des points de départ concrets.`
              : "Tu as pris le temps de préciser tes envies."}
          </p>
        </article>
        <article>
          <h3>Tes priorités</h3>
          <p>
            {String(state.answers.goal || "Avancer à ton rythme")}. Un rythme{" "}
            {String(state.answers.energy || "doux").toLowerCase()}, selon tes
            choix.
          </p>
        </article>
        <article>
          <h3>Ton premier objectif</h3>
          <p>{missions.find((m) => m.id === state.plan[0])?.description}</p>
        </article>
      </div>
      <Button to="/dashboard">C’est parti pour mon jour 1</Button>
      <Link className="text-link" to="/diagnostic">
        Modifier mes réponses
      </Link>
    </section>
  );
}
