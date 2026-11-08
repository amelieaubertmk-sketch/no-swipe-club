import { ArrowRight, MessageCircle, RotateCcw } from "lucide-react";
import { useState } from "react";
import { simulations } from "../data/content";

import { PageTitle } from "../components/UI";
export function Simulations() {
  const [scenario, setScenario] = useState(0);
  const [choice, setChoice] = useState<number | null>(null);
  const [continuation, setContinuation] = useState(false);
  const s = simulations[scenario];
  return (
    <section className="workspace simulation-page">
      <PageTitle
        label="LE LABO DES PETITS PAS"
        title="On essaie, juste pour voir ?"
        description="Un espace pour explorer des conversations. Aucune note, aucune formule magique."
      />
      <div className="simulation-tabs">
        {simulations.map((s, i) => (
          <button
            className={scenario === i ? "selected" : ""}
            key={s.title}
            onClick={() => {
              setScenario(i);
              setChoice(null);
              setContinuation(false);
            }}
          >
            0{i + 1} · {s.title}
          </button>
        ))}
      </div>
      <article className="simulation-card">
        <MessageCircle size={35} />
        <h2>{s.title}</h2>
        <p>{s.context}</p>
        <h3>Qu’aurais-tu envie de faire ?</h3>
        {s.choices.map(([label], i) => (
          <button
            className={`simulation-choice ${choice === i ? "selected" : ""}`}
            onClick={() => {
              setChoice(i);
              setContinuation(false);
            }}
            key={label}
          >
            {label}
            <ArrowRight size={17} />
          </button>
        ))}
        {choice !== null && (
          <div className="feedback" role="status">
            <span className="eyebrow">UNE SUITE POSSIBLE</span>
            <p>{s.choices[choice][1]}</p>
            <button className="text-link" onClick={() => setContinuation(true)}>
              Et ensuite ? <ArrowRight size={16} />
            </button>
            {continuation && (
              <p>
                {s.choices[choice][2]}
                <br />
                <small>
                  Le contexte et les envies de chacun comptent. Rien ne garantit
                  une suite romantique.
                </small>
              </p>
            )}
            <button
              className="secondary"
              onClick={() => {
                setChoice(null);
                setContinuation(false);
              }}
            >
              <RotateCcw size={16} /> Essayer autrement
            </button>
          </div>
        )}
      </article>
    </section>
  );
}
