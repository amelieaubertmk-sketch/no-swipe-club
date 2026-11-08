import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Clock,
  Compass,
  MessageCircle,
  Sun,
} from "lucide-react";
import { Link } from "react-router-dom";
import { missions, trackText } from "../data/content";
import { personalize } from "../lib/engine";

import { useStore } from "../app/store";
import { Button, MissionList, PageTitle } from "../components/UI";
export function Dashboard() {
  const { state } = useStore();
  const p = personalize(state.answers);
  const done = state.plan.filter(
    (id) => state.statuses[id] === "Terminée",
  ).length;
  const next =
    state.plan.find(
      (id) =>
        !["Terminée", "Passée", "Reportée"].includes(state.statuses[id] || ""),
    ) || state.plan.find((id) => state.statuses[id] === "Reportée");
  const m = missions.find((m) => m.id === next);
  return (
    <section className="workspace">
      <PageTitle
        label="TON ESPACE · NO SWIPE CLUB"
        title={
          done === 7
            ? "Sept petits pas. Et la suite ?"
            : "La vraie vie commence ici."
        }
        description={`${trackText[p.primary]} Ton parcours ${p.primary}, au rythme ${String(state.answers.energy || "doux").toLowerCase()}.`}
      />
      <div className="dashboard-grid">
        <article className="daily-card">
          <span className="eyebrow">
            {m
              ? `JOUR ${state.plan.indexOf(m.id) + 1} / 07 · ${m.track}`
              : "TON EXPÉRIENCE"}
          </span>
          <Sun size={45} strokeWidth={1} />
          <h2>
            {state.closed
              ? "Une pause, un bilan."
              : m
                ? m.title
                : "Tu as fait du chemin."}
          </h2>
          <p>
            {state.closed
              ? "Ton expérience est clôturée. Tu peux consulter tes actions ou recommencer depuis les paramètres."
              : m
                ? m.description
                : "Prends un instant pour regarder ce que tu as essayé."}
          </p>
          {m && !state.closed ? (
            <>
              <span className="meta">
                <Clock size={16} />
                {m.duration} min · Trois intensités au choix
              </span>
              <Button to={`/mission/${m.id}`} light>
                Découvrir ma mission
              </Button>
            </>
          ) : (
            <Button to="/bilan" light>
              Voir mon bilan
            </Button>
          )}
        </article>
        <aside className="progress-card">
          <span className="eyebrow">CHAQUE PETIT PAS COMPTE</span>
          <div className="big-number">
            {done}
            <span>/ 7</span>
          </div>
          <p>missions terminées, à ta façon.</p>
          <div className="days">
            {state.plan.map((id, i) => (
              <Link
                aria-label={`Jour ${i + 1} : ${state.statuses[id] || "À découvrir"}`}
                className={state.statuses[id] === "Terminée" ? "done" : ""}
                to={`/mission/${id}`}
                key={id}
              >
                {state.statuses[id] === "Terminée" ? (
                  <Check size={15} />
                ) : (
                  i + 1
                )}
              </Link>
            ))}
          </div>
          <p className="muted">
            Aucun retard à rattraper.
            <br />
            Tu peux avancer quand tu veux.
          </p>
          <Link className="text-link" to="/bilan">
            Mon petit bilan <ArrowUpRight size={16} />
          </Link>
        </aside>
      </div>
      <div className="section-heading compact">
        <h2>La suite du programme</h2>
        <Link className="text-link" to="/missions">
          Les 7 missions <ArrowRight size={16} />
        </Link>
      </div>
      <MissionList ids={state.plan.slice(0, 3)} />
      <div className="two-cols lower-dashboard">
        <article className="mini-panel">
          <Compass />
          <h3>Suivre tes envies</h3>
          <p>Des activités à chercher, selon tes passions et ton budget.</p>
          <Link className="text-link" to="/explorer">
            Explorer les activités <ArrowUpRight size={16} />
          </Link>
        </article>
        <article className="mini-panel pink">
          <MessageCircle />
          <h3>Et si on s’entraînait ?</h3>
          <p>Trois situations, plusieurs façons d’être toi-même.</p>
          <Link className="text-link" to="/simulations">
            Essayer une conversation <ArrowUpRight size={16} />
          </Link>
        </article>
      </div>
      <h2>Ton historique</h2>
      {Object.keys(state.statuses).length ? (
        <MissionList ids={state.plan.filter((id) => state.statuses[id])} />
      ) : (
        <p className="empty">
          Ton histoire commence. Les missions que tu essaieras apparaîtront ici.
        </p>
      )}
    </section>
  );
}
