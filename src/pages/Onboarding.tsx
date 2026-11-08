import { ArrowLeft, ArrowRight, Check, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { questions } from "../data/content";
import { personalize } from "../lib/engine";
import type { Answers } from "../types";

import { useStore } from "../app/store";
export function Onboarding() {
  const { state, update } = useStore();
  const navigate = useNavigate();
  const [answers, setAnswers] = useState<Answers>(state.answers);
  const [step, setStep] = useState(0);
  const q = questions[step];
  const value = answers[q.id];
  const valid =
    q.optional || (Array.isArray(value) ? value.length > 0 : !!value);
  function choose(v: string) {
    setAnswers((a) => ({
      ...a,
      [q.id]: q.multi
        ? Array.isArray(a[q.id])
          ? (a[q.id] as string[]).includes(v)
            ? (a[q.id] as string[]).filter((x) => x !== v)
            : [...(a[q.id] as string[]), v]
          : [v]
        : v,
    }));
  }
  function next() {
    if (!valid) return;
    if (step < questions.length - 1) setStep(step + 1);
    else {
      const plan = personalize(answers).plan;
      update({
        ...state,
        answers,
        plan,
        statuses: state.plan.join() === plan.join() ? state.statuses : {},
        closed: false,
      });
      navigate("/resultat");
    }
  }
  return (
    <section className="question-page">
      <div className="question-meta">
        <Link to="/">← Le club</Link>
        <span>
          TON POINT DE DÉPART · {String(step + 1).padStart(2, "0")} / 15
        </span>
      </div>
      <progress
        value={step + 1}
        max={15}
        aria-label="Avancement du diagnostic"
      />
      <div className="question-body" key={step}>
        <span className="eyebrow">ON APPREND À TE CONNAÎTRE</span>
        <h1>{q.title}</h1>
        <p>
          {q.hint || "Choisis la réponse qui te ressemble le plus aujourd’hui."}
        </p>
        <fieldset>
          <legend className="sr-only">{q.title}</legend>
          {q.options ? (
            <div className={`options ${q.multi ? "multi" : ""}`}>
              {q.options.map((v) => (
                <label
                  key={v}
                  className={
                    (Array.isArray(value) ? value.includes(v) : value === v)
                      ? "selected"
                      : ""
                  }
                >
                  <input
                    type={q.multi ? "checkbox" : "radio"}
                    name={q.id}
                    checked={
                      Array.isArray(value) ? value.includes(v) : value === v
                    }
                    onChange={() => choose(v)}
                  />
                  <span>{v}</span>
                  <span className="choice-indicator">
                    <Check size={15} />
                  </span>
                </label>
              ))}
            </div>
          ) : (
            <input
              autoComplete="address-level2"
              maxLength={80}
              className="city-input"
              aria-label="Ville ou région facultative"
              placeholder="Ex. Lyon, Bretagne…"
              value={String(value || "")}
              onChange={(e) => setAnswers({ ...answers, city: e.target.value })}
            />
          )}
        </fieldset>
        <div className="question-actions">
          <button
            className="secondary"
            disabled={step === 0}
            onClick={() => setStep(step - 1)}
          >
            <ArrowLeft size={17} /> Retour
          </button>
          <button className="button" disabled={!valid} onClick={next}>
            {step === 14
              ? "Découvrir mon plan"
              : q.optional && !value
                ? "Passer cette question"
                : "Continuer"}
            <ArrowRight size={18} />
          </button>
        </div>
        <p className="privacy-small">
          <ShieldCheck size={15} /> Aucune réponse n’est transmise. Tu pourras
          modifier tes préférences.
        </p>
      </div>
    </section>
  );
}
