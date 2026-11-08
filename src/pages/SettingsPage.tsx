import { ConfirmDialog } from "../components/ConfirmDialog";
import { ShieldCheck } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { personalize } from "../lib/engine";
import { clearState, initialState } from "../lib/storage";

import { useStore } from "../app/store";
import { PageTitle } from "../components/UI";
export function SettingsPage() {
  const { state, update } = useStore();
  const navigate = useNavigate();
  const [confirm, setConfirm] = useState<"delete" | "restart" | null>(null);
  return (
    <section className="workspace settings-page">
      <PageTitle
        label="PARAMÈTRES & CONFIDENTIALITÉ"
        title="Tes données. Tes choix."
        description="Tu peux utiliser ce prototype sans compte, sans paiement et sans donner ton identité."
      />
      <article className="instruction-card">
        <ShieldCheck size={30} />
        <h2>Ce qui reste sur cet appareil</h2>
        <p>
          Le diagnostic, le plan et les actions déclarées sont conservés dans le
          localStorage de ce navigateur uniquement si tu l’autorises. Sinon, ils
          restent en mémoire pendant cette session. Aucun serveur ne reçoit ces
          réponses, aucun analytics ni cookie publicitaire n’est installé.
        </p>
        <p>
          Ces données ne sont pas chiffrées. Une personne ayant accès à ce
          navigateur peut les consulter. Elles ne sont pas synchronisées entre
          appareils et peuvent disparaître si tu effaces les données du
          navigateur, changes de navigateur ou utilises la navigation privée.
        </p>
        <p>
          Les fichiers de l’application et ses polices sont servis par
          l’hébergeur. Celui-ci peut traiter des données techniques de connexion
          selon sa propre politique. Le prototype n’envoie pas ton diagnostic à
          l’hébergeur.
        </p>
        <label className="consent-toggle">
          <input
            type="checkbox"
            checked={state.answers.consent === "Oui, sur cet appareil"}
            onChange={(e) =>
              update({
                ...state,
                answers: {
                  ...state.answers,
                  consent: e.target.checked
                    ? "Oui, sur cet appareil"
                    : "Non, pour cette session",
                },
              })
            }
          />{" "}
          Conserver mon diagnostic et ma progression sur cet appareil
        </label>
        <p className="muted">
          Désactiver cette option retire immédiatement la copie enregistrée,
          tout en conservant la session en cours.
        </p>
      </article>
      <article className="instruction-card">
        <h2>Ton expérience reste entre tes mains</h2>
        <p>
          Ce produit n’est ni un service de thérapie ni un dispositif de santé
          mentale. Les scores sont des indices de sélection des missions, jamais
          un diagnostic. Ne saisis aucune information sur un tiers.
        </p>
        <div className="settings-actions">
          <Link className="secondary" to="/diagnostic">
            Modifier mes réponses
          </Link>
          <button
            className="secondary"
            disabled={!state.plan.length}
            onClick={() => setConfirm("restart")}
          >
            Recommencer les 7 jours
          </button>
          <button className="danger" onClick={() => setConfirm("delete")}>
            Effacer mes données
          </button>
        </div>
      </article>
      {confirm && (
        <ConfirmDialog onCancel={() => setConfirm(null)}>
          <h2 id="dialog-title">
            {confirm === "delete"
              ? "Tout effacer de cet appareil ?"
              : "Un nouveau départ ?"}
          </h2>
          <p>
            {confirm === "delete"
              ? "Ton diagnostic et ta progression seront supprimés de ce navigateur. Cette action est définitive."
              : "Les réponses seront conservées, mais les missions et les actions déclarées seront remises à zéro."}
          </p>
          <button
            autoFocus
            className="secondary"
            onClick={() => setConfirm(null)}
          >
            Annuler
          </button>
          <button
            className="button"
            onClick={() => {
              if (confirm === "delete") {
                try {
                  clearState(localStorage);
                } catch {
                  /* Update also reports unavailable storage. */
                }
                update(initialState());
                navigate("/");
              } else {
                update({
                  ...initialState(),
                  answers: state.answers,
                  plan: personalize(state.answers).plan,
                });
                navigate("/dashboard");
              }
              setConfirm(null);
            }}
          >
            {confirm === "delete" ? "Oui, effacer mes données" : "Recommencer"}
          </button>
        </ConfirmDialog>
      )}
    </section>
  );
}
