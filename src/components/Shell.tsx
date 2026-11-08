import {
  ArrowUpRight,
  BookOpen,
  ChartNoAxesCombined,
  Compass,
  LayoutDashboard,
  Menu,
  Settings,
  Sun,
  X,
} from "lucide-react";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

import { useStore } from "../app/store";
import { Brand } from "./UI";
export function Shell({ children }: { children: ReactNode }) {
  const { state, error } = useStore();
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => setOpen(false), [pathname]);
  const inside = !["/", "/diagnostic", "/resultat"].includes(pathname);
  return (
    <>
      <a href="#main" className="skip">
        Aller au contenu
      </a>
      <header>
        <Brand />
        <nav
          className={open ? "topnav open" : "topnav"}
          aria-label="Navigation principale"
        >
          <Link
            to="/#approche"
            onClick={() =>
              setTimeout(
                () => document.getElementById("approche")?.scrollIntoView(),
                50,
              )
            }
          >
            L’esprit du club
          </Link>
          <Link to={state.plan.length ? "/missions" : "/diagnostic"}>
            Le programme <span className="tiny">7 JOURS</span>
          </Link>
          <Link to="/confidentialite">Nos engagements</Link>
        </nav>
        <Link
          className="header-cta"
          to={state.plan.length ? "/dashboard" : "/diagnostic"}
        >
          {state.plan.length ? "Mon espace" : "Rejoindre le club"}
          <ArrowUpRight size={16} />
        </Link>
        <button
          className="mobile-menu icon-button"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
        >
          {open ? <X /> : <Menu />}
        </button>
      </header>
      {error && (
        <p role="alert" className="notice">
          Le stockage est indisponible. Ton parcours reste utilisable pendant
          cette session.
        </p>
      )}
      <main id="main" className={inside ? "inside" : ""}>
        {children}
      </main>
      <footer>
        <div>
          <Brand />
          <p>
            Un produit LOVE IS NOT LATE.
            <br />
            Less swiping. More living.
          </p>
        </div>
        <p>
          Prototype de démonstration · 2026
          <br />
          <Link to="/confidentialite">Confidentialité & paramètres</Link>
        </p>
        <span>
          La vraie vie t’attend. <ArrowUpRight size={19} />
        </span>
      </footer>
      {inside && (
        <nav className="bottom-nav" aria-label="Mon espace">
          {[
            [LayoutDashboard, "/dashboard", "Aujourd’hui"],
            [BookOpen, "/missions", "Missions"],
            [Compass, "/explorer", "Explorer"],
            [ChartNoAxesCombined, "/bilan", "Bilan"],
            [Settings, "/parametres", "Réglages"],
          ].map(([Icon, to, label]) => {
            const I = Icon as typeof Sun;
            return (
              <NavLink key={String(to)} to={String(to)}>
                <I size={20} />
                <span>{String(label)}</span>
              </NavLink>
            );
          })}
        </nav>
      )}
    </>
  );
}
