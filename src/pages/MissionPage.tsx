import {
  ArrowLeft,
  ArrowRight,
  Check,
  Clock,
  Flower2,
  Sparkles,
} from "lucide-react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { missions } from "../data/content";
import type { Status } from "../types";

import { useStore } from "../app/store";
import { PageTitle } from "../components/UI";
import { NotFound } from "./NotFound";
export function MissionPage() {
  const { id } = useParams();
  const { state, update } = useStore();
  const m = missions.find((m) => m.id === id);
  const [intensity, setIntensity] = useState("Doux");
  const [reflection, setReflection] = useState(false);
  if (!m || !state.plan.includes(m.id)) return <NotFound />;
  function status(s: Status) {
    update({ ...state, statuses: { ...state.statuses, [m!.id]: s } });
  }
  return (
    <section className="workspace mission-detail">
      <Link className="text-link" to="/missions">
        <ArrowLeft size={16} /> Le programme
      </Link>
      <PageTitle
        label={`JOUR ${state.plan.indexOf(m.id) + 1} · ${m.track}`}
        title={m.title}
        description={m.description}
      />
      <div className="mission-layout">
        <div>
          <div className="mission-facts">
            <span>
              <Clock size={17} />
              {m.duration} min
            </span>
            <span>Difficulté {m.difficulty}/3</span>
            <span className="status">
              {state.statuses[m.id] || "À découvrir"}
            </span>
          </div>
          <article className="instruction-card">
            <h2>Un objectif concret</h2>
            <p>{m.goal}</p>
            <p>
              <strong>Pour toi :</strong>{" "}
              {Array.isArray(state.answers.passions)
                ? `appuie-toi sur ${state.answers.passions[0]}. `
                : ""}
              Cherche un cadre{" "}
              {String(state.answers.social || "qui te convient").toLowerCase()},{" "}
              {String(
                state.answers.availability || "à ton rythme",
              ).toLowerCase()}
              .{" "}
              {state.answers.budget === "Gratuit uniquement"
                ? "Privilégie une option gratuite et vérifie les modalités."
                : `Respecte ton budget : ${state.answers.budget || "à ton choix"}.`}
            </p>
            <h3>Choisis ton intensité</h3>
            <div className="segmented">
              {["Doux", "Standard", "Ambitieux"].map((x) => (
                <button
                  key={x}
                  aria-pressed={intensity === x}
                  onClick={() => setIntensity(x)}
                  className={intensity === x ? "selected" : ""}
                >
                  {x}
                </button>
              ))}
            </div>
            <p className="intensity-text">
              {intensity === "Doux"
                ? m.soft
                : intensity === "Standard"
                  ? m.standard
                  : m.ambitious}
            </p>
            <h3>Les étapes possibles</h3>
            <ol className="steps">
              {m.steps.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ol>
            <p className="muted">
              Ces étapes sont des possibilités : la version douce suffit pour
              réaliser la mission.
            </p>
            <h3>Matériel</h3>
            <p>{m.materials}</p>
            <h3>C’est fait quand…</h3>
            <p>{m.criterion}</p>
            <button
              className="text-link"
              onClick={() => setReflection(!reflection)}
              aria-expanded={reflection}
            >
              Un moment pour réfléchir (facultatif) <Sparkles size={16} />
            </button>
            {reflection && (
              <p className="notice">
                {m.reflection} Aucune réponse écrite n’est collectée.
              </p>
            )}
          </article>
        </div>
        <aside className="action-panel">
          <Flower2 size={36} strokeWidth={1} />
          <h3>À toi de choisir.</h3>
          <p>Tu n’as rien à prouver. Préparer compte aussi.</p>
          {(["En cours", "Terminée", "Reportée", "Passée"] as Status[]).map(
            (s) => (
              <button
                className={s === "Terminée" ? "button" : "secondary"}
                key={s}
                onClick={() => status(s)}
              >
                {s === "Terminée"
                  ? "Marquer comme terminée"
                  : s === "En cours"
                    ? "Commencer"
                    : s === "Reportée"
                      ? "Reporter"
                      : "Passer cette mission"}
                {s === "Terminée" && <Check size={17} />}
              </button>
            ),
          )}
          <p role="status">
            {state.statuses[m.id]
              ? `Mission ${state.statuses[m.id].toLowerCase()}. Tu peux changer d’avis.`
              : ""}
          </p>
          <Link className="text-link" to="/dashboard">
            Retour à mon espace <ArrowRight size={16} />
          </Link>
        </aside>
      </div>
    </section>
  );
}
