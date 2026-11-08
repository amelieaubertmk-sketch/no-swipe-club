import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

import { useStore } from "../app/store";
import { MissionList, PageTitle } from "../components/UI";
export function Library() {
  const { state } = useStore();
  return (
    <section className="workspace">
      <PageTitle
        label="LE PROGRAMME"
        title="Sept jours. Ton rythme."
        description="Préparer, essayer, reporter : tu choisis la forme de chaque petit pas."
      />
      <MissionList ids={state.plan} />
      <div className="notice">
        Les missions sont disponibles immédiatement pour cette démonstration.
        Aucune attente de 24 heures.
      </div>
      <Link className="text-link" to="/simulations">
        Explorer les simulations de conversation <ArrowUpRight size={16} />
      </Link>
    </section>
  );
}
