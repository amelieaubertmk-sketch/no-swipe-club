import { missions, tracks } from "../data/content";
import type { Answers, Track } from "../types";
export function personalize(a: Answers) {
  const scores: Record<Track, number> = {
    RESTART: 10,
    CONFIDENCE: 10,
    "REAL LIFE": 10,
  };
  if (a.breakup === "Oui") scores.RESTART += 40;
  if (a.situation === "Récemment séparé·e") scores.RESTART += 15;
  if (a.goal === "Reconstruction personnelle") scores.RESTART += 35;
  const ease = Number(a.ease || 3);
  scores.CONFIDENCE += (5 - ease) * 12;
  if (
    a.difficulty === "Dépasser ma timidité" ||
    a.difficulty === "Retrouver confiance"
  )
    scores.CONFIDENCE += 30;
  if (a.start === "La confiance") scores.CONFIDENCE += 20;
  if (a.apps === "Pas pour moi") scores["REAL LIFE"] += 30;
  if (a.difficulty === "Trouver des occasions") scores["REAL LIFE"] += 25;
  if (a.start === "Les rencontres" || a.start === "La vie sociale")
    scores["REAL LIFE"] += 20;
  tracks.forEach((t) => (scores[t] = Math.min(100, scores[t])));
  const ranked = [...tracks].sort((x, y) => scores[y] - scores[x]);
  const recovering =
    a.goal === "Reconstruction personnelle" || a.breakup === "Oui";
  const sequence = Array.from({ length: 7 }, (_, i) => {
    const track =
      i === 4 && scores[ranked[2]] >= 30
        ? ranked[2]
        : i === 0 || i === 6
          ? ranked[0]
          : i === 2 || i === 5
            ? ranked[1]
            : ranked[0];
    // Une reconstruction ne conduit pas à une demande de contact romantique.
    const chosen = missions.filter((m) => m.track === track)[
      recovering && track === "REAL LIFE" ? Math.min(i, 5) : i
    ];
    return chosen.id;
  });
  return {
    scores,
    primary: ranked[0],
    secondary: ranked.slice(1).filter((t) => scores[t] >= 30),
    plan: sequence,
  };
}
