import {
  BookOpen,
  Check,
  Compass,
  Flower2,
  Leaf,
  ShieldCheck,
  Sparkles,
  Sun,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { activityTips, passions } from "../data/content";

import { useStore } from "../app/store";
import { PageTitle } from "../components/UI";
export function Explorer() {
  const { state, update } = useStore();
  const [filter, setFilter] = useState("Pour moi");
  const chosen = Array.isArray(state.answers.passions)
    ? state.answers.passions
    : [];
  const sorted = passions
    .map((p, i) => ({ p, i }))
    .sort(
      (a, b) => Number(chosen.includes(b.p)) - Number(chosen.includes(a.p)),
    );
  const shown =
    filter === "Mes passions"
      ? sorted.filter((x) => chosen.includes(x.p))
      : sorted;
  return (
    <section className="workspace">
      <PageTitle
        label="EXPLORER"
        title="Sors du cadre. Reste toi."
        description="Suggestions d’activités à rechercher près de chez toi — événements non vérifiés."
      />
      <div className="notice">
        <ShieldCheck size={20} />
        <span>
          Aucune date, adresse, disponibilité ou tarif n’est vérifié ici.
          Consulte les sources officielles avant toute sortie.{" "}
          {state.answers.city ? `Zone souhaitée : ${state.answers.city}.` : ""}
        </span>
      </div>
      <div className="explorer-preferences">
        <span>{state.answers.budget || "Budget libre"}</span>
        <span>{state.answers.social || "Tous les cadres"}</span>
        <span>
          {String(state.answers.availability || "Disponibilités libres")}
        </span>
      </div>
      <div className="segmented">
        {["Pour moi", "Mes passions"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            aria-pressed={filter === f}
            className={filter === f ? "selected" : ""}
          >
            {f}
          </button>
        ))}
      </div>
      <div className="activity-grid">
        {shown.map(({ p, i }) => (
          <article className="activity-card" key={p}>
            <span className="activity-symbol">
              {
                [
                  <BookOpen />,
                  <Compass />,
                  <Sun />,
                  <Leaf />,
                  <BookOpen />,
                  <Compass />,
                  <Flower2 />,
                  <Sparkles />,
                  <Sun />,
                ][i]
              }
            </span>
            <span className="eyebrow">
              {chosen.includes(p)
                ? "UNE DE TES PASSIONS"
                : "UNE PISTE À EXPLORER"}
            </span>
            <h2>{p}</h2>
            <p>{activityTips[i]}</p>
            <p className="muted">
              {state.answers.budget === "Gratuit uniquement"
                ? "Ajoute « gratuit » à ta recherche. Bibliothèques et associations sont des pistes, sans garantie de gratuité."
                : "Vérifie le coût total, les conditions et le matériel avant de réserver."}{" "}
              {state.answers.social === "Petit groupe"
                ? "Demande la taille du groupe."
                : state.answers.social === "Activités structurées"
                  ? "Privilégie un accueil et un déroulement annoncés."
                  : "Prévois une option facile à quitter."}
            </p>
            <details>
              <summary>Préparer ma recherche</summary>
              <p>
                Recherche « {p.toLowerCase()}{" "}
                {state.answers.city || "près de chez moi"} débutants{" "}
                {state.answers.availability || ""} ». Vérifie la source,
                l’accueil des personnes seules et l’accessibilité.
              </p>
            </details>
            <div className="activity-actions">
              <button
                className="secondary"
                onClick={() =>
                  update({
                    ...state,
                    explored: state.explored.includes(p)
                      ? state.explored
                      : [...state.explored, p],
                  })
                }
              >
                {state.explored.includes(p) ? (
                  <>
                    <Check size={15} /> Explorée
                  </>
                ) : (
                  "J’ai exploré cette piste"
                )}
              </button>
              <button
                className="text-link"
                aria-pressed={state.favorites.includes(p)}
                onClick={() =>
                  update({
                    ...state,
                    favorites: state.favorites.includes(p)
                      ? state.favorites.filter((x) => x !== p)
                      : [...state.favorites, p],
                  })
                }
              >
                {state.favorites.includes(p)
                  ? "À refaire ✓"
                  : "Envie de refaire"}
              </button>
            </div>
          </article>
        ))}
      </div>
      {!shown.length && (
        <p className="empty">
          Aucune passion sélectionnée.{" "}
          <Link to="/diagnostic">Modifier tes préférences</Link>.
        </p>
      )}
    </section>
  );
}
