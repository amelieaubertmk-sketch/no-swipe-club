import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { missions } from "../data/content";

import { useStore } from "../app/store";
export const Button = ({
  to,
  children,
  light = false,
}: {
  to: string;
  children: ReactNode;
  light?: boolean;
}) => (
  <Link className={`button ${light ? "light" : ""}`} to={to}>
    {children}
    <ArrowUpRight size={18} />
  </Link>
);
export function Brand() {
  return (
    <Link to="/" className="brand" aria-label="No Swipe Club, accueil">
      NO SWIPE
      <span>
        CLUB<sup>®</sup>
      </span>
    </Link>
  );
}
export function PageTitle({
  label,
  title,
  description,
}: {
  label: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="page-title">
      <span className="eyebrow">{label}</span>
      <h1>{title}</h1>
      {description && <p>{description}</p>}
    </div>
  );
}
export function MissionList({ ids }: { ids: string[] }) {
  const { state } = useStore();
  return (
    <div className="mission-list">
      {ids.map((id) => {
        const m = missions.find((m) => m.id === id);
        if (!m) return null;
        return (
          <Link key={id} to={`/mission/${id}`}>
            <span className="mission-number">
              {String(state.plan.indexOf(id) + 1).padStart(2, "0")}
            </span>
            <div>
              <span className="eyebrow">
                {m.track} · {m.duration} MIN
              </span>
              <h3>{m.title}</h3>
            </div>
            <span
              className={`status ${state.statuses[id] === "Terminée" ? "complete" : ""}`}
            >
              {state.statuses[id] || "À découvrir"}
            </span>
            <ArrowUpRight size={20} />
          </Link>
        );
      })}
    </div>
  );
}
