import { ArrowUpRight, Flower2 } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

import { useStore } from "../app/store";
import { MissionList, PageTitle } from "../components/UI";
export function ProgressPage() {
  const { state, update } = useStore();
  const [confirm, setConfirm] = useState(false);
  const done = state.plan.filter(
    (id) => state.statuses[id] === "Terminée",
  ).length;
  return (
    <section className="workspace">
      <PageTitle
        label={
          state.closed || done === 7
            ? "LE BILAN DE TON EXPÉRIENCE"
            : "TON CARNET DE PROGRESSION"
        }
        title="Regarde le chemin parcouru."
        description="Des actions réelles, déclarées par toi. Aucun objectif de performance."
      />
      <div className="stats">
        {[
          [done, "missions terminées"],
          [state.explored.length, "activités explorées"],
          [state.outings, "sorties déclarées"],
          [state.conversations, "conversations déclarées"],
        ].map(([n, t]) => (
          <article key={t}>
            <strong>{n}</strong>
            <span>{t}</span>
          </article>
        ))}
      </div>
      <div className="two-cols">
        <article className="instruction-card">
          <h2>Ce que tu as essayé</h2>
          <p>
            Tu peux renseigner ces actions sans décrire les personnes
            rencontrées.
          </p>
          {(["outings", "conversations"] as const).map((k) => (
            <label className="field" key={k}>
              {k === "outings" ? "Sorties réalisées" : "Conversations initiées"}
              <input
                type="number"
                min="0"
                max="999"
                value={state[k]}
                onChange={(e) =>
                  update({
                    ...state,
                    [k]: Math.min(999, Math.max(0, Number(e.target.value))),
                  })
                }
              />
            </label>
          ))}
          {(["before", "after"] as const).map((k) => (
            <label className="field" key={k}>
              Aisance {k === "before" ? "au début" : "aujourd’hui"} (facultatif)
              <select
                value={state[k]}
                onChange={(e) => update({ ...state, [k]: e.target.value })}
              >
                <option value="">Non renseignée</option>
                {[1, 2, 3, 4, 5].map((n) => (
                  <option key={n} value={n}>
                    {n} / 5{" "}
                    {n === 1
                      ? "— peu à l’aise"
                      : n === 5
                        ? "— très à l’aise"
                        : ""}
                  </option>
                ))}
              </select>
            </label>
          ))}
        </article>
        <article className="mini-panel pink">
          <Flower2 size={38} />
          <h2>Ce que tu veux garder</h2>
          {state.favorites.length ? (
            <ul>
              {state.favorites.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          ) : (
            <p>
              Dans Explorer, choisis « Envie de refaire » pour garder les
              activités qui te plaisent.
            </p>
          )}
          <p>
            {done > 0
              ? `Tu as essayé ${done} mission${done > 1 ? "s" : ""}. C’est une expérience concrète sur laquelle t’appuyer.`
              : "Ton bilan se construira avec tes actions. Rien à inventer, rien à rattraper."}
          </p>
          {state.before && state.after && (
            <p>
              Aisance déclarée : {state.before}/5 au début, {state.after}/5
              aujourd’hui. Ce ressenti est personnel et peut varier.
            </p>
          )}
          <Link className="text-link" to="/explorer">
            Trouver ma prochaine activité <ArrowUpRight size={16} />
          </Link>
        </article>
      </div>
      <h2>Les actions de ton programme</h2>
      <MissionList
        ids={state.plan.filter((id) => state.statuses[id] === "Terminée")}
      />
      {!state.closed && done < 7 && (
        <div className="close-experience">
          <button className="secondary" onClick={() => setConfirm(true)}>
            Clôturer mon expérience maintenant
          </button>
          {confirm && (
            <div className="notice" role="alert">
              <p>
                Créer ton bilan avec les actions déjà réalisées ? Tu pourras
                recommencer depuis les paramètres.
              </p>
              <button
                className="button"
                onClick={() => {
                  update({ ...state, closed: true });
                  setConfirm(false);
                }}
              >
                Oui, clôturer
              </button>
              <button className="secondary" onClick={() => setConfirm(false)}>
                Continuer le programme
              </button>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
