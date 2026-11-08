import { describe, it, expect } from "vitest";
import { personalize } from "./engine";
import { missions } from "../data/content";
import { initialState, saveState, readState, clearState, KEY } from "./storage";
import type { Answers } from "../types";
const restart: Answers = {
  breakup: "Oui",
  goal: "Reconstruction personnelle",
  situation: "Récemment séparé·e",
  ease: "4",
};
const confidence: Answers = {
  ease: "1",
  difficulty: "Dépasser ma timidité",
  start: "La confiance",
};
const realLife: Answers = {
  ease: "5",
  apps: "Pas pour moi",
  difficulty: "Trouver des occasions",
  start: "Les rencontres",
};
describe("personnalisation explicable", () => {
  it.each([
    [restart, "RESTART"],
    [confidence, "CONFIDENCE"],
    [realLife, "REAL LIFE"],
  ] as const)("identifie le parcours pour %o", (answers, track) => {
    expect(personalize(answers).primary).toBe(track);
  });
  it("produit trois plans différents de sept missions connues et uniques", () => {
    const plans = [restart, confidence, realLife].map(
      (a) => personalize(a).plan,
    );
    expect(new Set(plans.map((p) => p.join())).size).toBe(3);
    for (const p of plans) {
      expect(p).toHaveLength(7);
      expect(new Set(p).size).toBe(7);
      expect(p.every((id) => missions.some((m) => m.id === id))).toBe(true);
    }
  });
  it("combine les dimensions sans forcer le contact pendant la reconstruction", () => {
    const result = personalize({ ...restart, ...realLife, ease: "1" });
    expect(result.secondary.length).toBeGreaterThan(0);
    expect(result.plan).not.toContain("real-life-7");
    expect(result.plan.some((id) => id.startsWith("restart"))).toBe(true);
  });
  it("accepte des réponses absentes sans score invalide", () => {
    const p = personalize({});
    expect(p.plan).toHaveLength(7);
    Object.values(p.scores).forEach((s) => {
      expect(s).toBeGreaterThanOrEqual(0);
      expect(s).toBeLessThanOrEqual(100);
    });
  });
  it("est déterministe", () =>
    expect(personalize(confidence)).toEqual(personalize(confidence)));
  it("contient 21 missions complètes et des variantes douces", () => {
    expect(missions).toHaveLength(21);
    for (const m of missions) {
      expect(m.steps).toHaveLength(3);
      expect(m.soft).toBeTruthy();
      expect(m.criterion).toBeTruthy();
    }
  });
});
function storage() {
  const data = new Map<string, string>();
  return {
    getItem: (k: string) => data.get(k) || null,
    setItem: (k: string, v: string) => {
      data.set(k, v);
    },
    removeItem: (k: string) => {
      data.delete(k);
    },
  };
}
describe("persistance et vie privée", () => {
  it("restaure diagnostic, mission reportée et progression après relecture", () => {
    const s = storage();
    const state = {
      ...initialState(),
      answers: { ...confidence, consent: "Oui, sur cet appareil" },
      plan: personalize(confidence).plan,
      statuses: {
        "confidence-1": "Terminée" as const,
        "confidence-2": "Reportée" as const,
      },
      outings: 2,
    };
    expect(saveState(s, state)).toBe(true);
    expect(readState(s)).toEqual(state);
  });
  it("ne conserve rien sans consentement et supprime une ancienne copie", () => {
    const s = storage();
    s.setItem(KEY, "ancienne copie");
    saveState(s, initialState());
    expect(s.getItem(KEY)).toBeNull();
  });
  it("efface uniquement les données de cette application", () => {
    const s = storage();
    s.setItem("autre-app", "intact");
    s.setItem(KEY, "données");
    clearState(s);
    expect(s.getItem(KEY)).toBeNull();
    expect(s.getItem("autre-app")).toBe("intact");
  });
  it("ignore les données corrompues et les versions inconnues", () => {
    const s = storage();
    for (const bad of [
      "{",
      "null",
      '{"version":2}',
      '{"version":1,"plan":[]}',
    ]) {
      s.setItem(KEY, bad);
      expect(readState(s)).toEqual(initialState());
    }
  });
  it("signale un stockage refusé sans bloquer la session", () => {
    expect(
      saveState(
        {
          getItem: () => null,
          setItem: () => {
            throw Error("denied");
          },
          removeItem: () => {
            throw Error("denied");
          },
        },
        initialState(),
      ),
    ).toBe(false);
  });
});
