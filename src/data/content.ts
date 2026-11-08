import type { Mission, Track } from "../types";
export const tracks: Track[] = ["RESTART", "CONFIDENCE", "REAL LIFE"];
export const trackText: Record<Track, string> = {
  RESTART: "Faire de la place pour toi.",
  CONFIDENCE: "Oser, un petit pas à la fois.",
  "REAL LIFE": "Reconnecter avec la vraie vie.",
};
export const passions = [
  "Jeux de société",
  "Gaming",
  "Sport",
  "Cuisine",
  "Lecture",
  "Randonnée",
  "Ateliers créatifs",
  "Bénévolat",
  "Activités culturelles",
];
export const questions = [
  {
    id: "age",
    title: "Où en es-tu dans ta vie ?",
    hint: "Une tranche d’âge suffit.",
    options: ["18–24", "25–27", "28–30", "31–35", "36+"],
  },
  {
    id: "situation",
    title: "Ta situation aujourd’hui ?",
    options: [
      "Célibataire",
      "Récemment séparé·e",
      "En transition",
      "Préfère ne pas répondre",
    ],
  },
  {
    id: "goal",
    title: "Qu’est-ce qui t’amène ici ?",
    options: [
      "Relation sérieuse",
      "Nouvelles rencontres sans pression",
      "Reconstruction personnelle",
    ],
  },
  {
    id: "breakup",
    title: "Une relation longue s’est-elle terminée récemment ?",
    options: ["Oui", "Non", "Préfère ne pas répondre"],
  },
  {
    id: "ease",
    title: "Comment te sens-tu dans les échanges ?",
    hint: "1 : peu à l’aise · 5 : très à l’aise. Aucun bon score à atteindre.",
    options: ["1", "2", "3", "4", "5"],
  },
  {
    id: "difficulty",
    title: "Qu’aimerais-tu rendre plus facile ?",
    options: [
      "Trouver des occasions",
      "Dépasser ma timidité",
      "Retrouver confiance",
      "Avancer après une rupture",
      "Autre",
    ],
  },
  {
    id: "apps",
    title: "Et les applications de rencontre ?",
    options: [
      "Pas pour moi",
      "Besoin d’une pause",
      "Pourquoi pas, en complément",
    ],
  },
  {
    id: "passions",
    title: "Qu’est-ce qui te fait vibrer ?",
    hint: "Choisis une ou plusieurs passions.",
    options: passions,
    multi: true,
  },
  {
    id: "city",
    title: "Dans quel coin aimerais-tu explorer ?",
    hint: "Facultatif. Une ville ou une région, jamais ton adresse.",
    optional: true,
  },
  {
    id: "budget",
    title: "Quel budget mensuel pour tes activités ?",
    options: [
      "Gratuit uniquement",
      "Moins de 30 €",
      "30 à 70 €",
      "Plus de 70 €",
    ],
  },
  {
    id: "availability",
    title: "Quand as-tu un peu de temps ?",
    options: ["En semaine", "Le soir", "Le week-end"],
    multi: true,
  },
  {
    id: "social",
    title: "Ton cadre préféré ?",
    options: ["Petit groupe", "Activités structurées", "Activités spontanées"],
  },
  {
    id: "energy",
    title: "Quel rythme te ressemble ?",
    options: ["Doux", "Modéré", "Ambitieux"],
  },
  {
    id: "start",
    title: "Par quoi aimerais-tu commencer ?",
    options: ["La confiance", "La vie sociale", "Les rencontres"],
  },
  {
    id: "consent",
    title: "On garde ta place pour la prochaine fois ?",
    hint: "Avec ton accord, diagnostic et progression sont enregistrés dans ce navigateur, sans chiffrement ni synchronisation. Tu peux tout effacer. Sans accord, ils restent en mémoire jusqu’à la fermeture ou l’actualisation.",
    options: ["Oui, sur cet appareil", "Non, pour cette session"],
  },
];
const seeds: Record<Track, [string, string, string][]> = {
  RESTART: [
    [
      "Retrouver ton petit plaisir",
      "Redécouvre une activité qui te plaît, juste pour toi.",
      "Choisis une activité que tu appréciais avant ou pendant ta relation.|Accorde-lui dix minutes sans objectif de performance.|Décide si tu souhaites la refaire.",
    ],
    [
      "Dessiner la suite",
      "Clarifie ce que tu souhaites pour ton quotidien.",
      "Choisis un domaine de vie qui compte pour toi.|Imagine une petite amélioration possible.|Note une action à essayer cette semaine.",
    ],
    [
      "Renouer avec une personne de confiance",
      "Retrouve un lien qui te fait du bien.",
      "Pense à une personne auprès de qui tu te sens respecté·e.|Prépare un message simple, sans parler de ta rupture si tu ne le souhaites pas.|Envoie-le seulement si tu en as envie.",
    ],
    [
      "Sortir pour le plaisir",
      "Une sortie sans objectif romantique.",
      "Choisis un lieu ou une activité familière.|Prévois un temps court et un retour facile.|Profite du lieu sans obligation de parler.",
    ],
    [
      "Écouter tes limites",
      "Identifie ce qui te convient dans une relation.",
      "Pense à une situation où tu te sens respecté·e.|Identifie une limite importante pour toi.|Prépare une phrase pour l’exprimer.",
    ],
    [
      "Changer de décor",
      "Découvre un environnement à ton rythme.",
      "Repère un lieu accessible qui t’intrigue.|Vérifie ses horaires auprès de la source officielle.|Visite-le ou prépare une visite.",
    ],
    [
      "Garder ce qui compte",
      "Reconnais ce que tu veux conserver dans ta vie.",
      "Repense à un moment agréable de la semaine.|Identifie ce qui l’a rendu possible.|Choisis une habitude à préserver.",
    ],
  ],
  CONFIDENCE: [
    [
      "Reconnaître tes qualités",
      "Trouve des qualités à partir de tes propres exemples.",
      "Repense à une action dont tu es satisfait·e.|Identifie la qualité qu’elle a mobilisée.|Cherche jusqu’à trois exemples, sans te forcer.",
    ],
    [
      "Une question, simplement",
      "Prépare une question dans un contexte quotidien.",
      "Choisis une situation simple et appropriée.|Prépare une question pratique, par exemple sur un livre.|Pose-la si le moment convient, ou entraîne-toi à voix haute.",
    ],
    [
      "Le point commun",
      "Ouvre un échange autour d’un intérêt partagé.",
      "Choisis un sujet lié à une passion.|Prépare une question ouverte.|Écoute la réponse ou répète la scène seul·e.",
    ],
    [
      "Trouver ta place dans un groupe",
      "Prépare une activité collective sans pression.",
      "Repère une activité structurée.|Vérifie qu’elle accueille les débutants.|Prépare ta venue ou observe le déroulement.",
    ],
    [
      "Une invitation sans pression",
      "Entraîne-toi à proposer une sortie.",
      "Choisis une activité que tu aimerais partager.|Formule une invitation laissant la possibilité de refuser.|Répète-la, sans obligation de l’envoyer.",
    ],
    [
      "Revenir en terrain connu",
      "La familiarité peut faciliter les échanges.",
      "Identifie un lieu que tu apprécies.|Prévois un deuxième passage.|Choisis un détail à observer ou une personne à saluer si tu le souhaites.",
    ],
    [
      "Repérer tes moments d’aisance",
      "Observe les conditions qui t’aident.",
      "Repense à un moment où tu étais à l’aise.|Identifie le contexte, la durée et les personnes présentes sans enregistrer leurs données.|Choisis une condition à retrouver.",
    ],
  ],
  "REAL LIFE": [
    [
      "Suivre ta curiosité",
      "Repère des activités liées à tes passions.",
      "Choisis une passion.|Cherche trois types d’activités auprès de sources locales.|Garde une piste à vérifier.",
    ],
    [
      "Venir solo, être bienvenu·e",
      "Trouve un cadre accueillant pour les personnes seules.",
      "Repère une activité qui t’intéresse.|Cherche la mention débutants ou participants solo.|Vérifie cette information auprès de l’organisateur.",
    ],
    [
      "Le premier contact",
      "Éclaircis les modalités avant de te déplacer.",
      "Prépare une question sur le déroulement.|Trouve le contact officiel de l’organisateur.|Envoie ta question ou garde le brouillon.",
    ],
    [
      "Partager une activité",
      "Fais une place à un moment collectif.",
      "Vérifie les modalités et ton budget.|Prévois une durée et une façon de rentrer.|Participe ou prépare une visite d’observation.",
    ],
    [
      "Parler de ce qui vous réunit",
      "L’activité offre un sujet naturel.",
      "Observe un détail de l’activité.|Prépare une question à ce sujet.|Propose un échange si la personne paraît disponible, sans insister.",
    ],
    [
      "Revenir une deuxième fois",
      "Crée une occasion de retrouver un cadre apprécié.",
      "Identifie ce qui t’a plu.|Vérifie la prochaine possibilité auprès de la source officielle.|Inscris ce rendez-vous dans ton agenda si tu le souhaites.",
    ],
    [
      "Garder le lien, librement",
      "Propose un contact si l’envie semble partagée.",
      "Repère les signes d’un échange réciproque.|Prépare : « Ça te dirait de se recroiser à une prochaine séance ? »|Accepte toute réponse et laisse de l’espace.",
    ],
  ],
};
export const missions: Mission[] = tracks.flatMap((track) =>
  seeds[track].map(([title, description, steps], i) => ({
    id: `${track.replace(" ", "-").toLowerCase()}-${i + 1}`,
    track,
    title,
    description,
    goal: description,
    duration: [10, 15, 10, 40, 15, 30, 15][i],
    difficulty: i < 3 ? 1 : 2,
    materials: "Un peu de temps ; notes facultatives.",
    steps: steps.split("|"),
    soft: "Prépare seulement la première étape. Observer ou répéter est déjà une action.",
    standard: steps.split("|").slice(0, 2).join(" "),
    ambitious: steps.split("|").join(" "),
    reflection:
      "Qu’est-ce qui t’a semblé agréable ou utile ? Tu peux simplement y réfléchir.",
    criterion:
      "Tu as essayé la version choisie, même sans interaction ni résultat extérieur.",
  })),
);
export const activityTips = [
  "Cherche une soirée découverte avec explication des règles.",
  "Cherche une association de jeu coopératif ou un atelier local.",
  "Cherche une initiation encadrée pour débutants.",
  "Cherche un atelier participatif ou une cuisine associative.",
  "Cherche un club de lecture en bibliothèque.",
  "Cherche une marche associative de niveau adapté.",
  "Cherche un atelier découverte en petit groupe.",
  "Cherche une mission ponctuelle auprès d’une association.",
  "Cherche une visite commentée ou un atelier de musée.",
];
export interface VerifiedEvent {
  id: string;
  sourceUrl: string;
  verifiedAt: string;
  title: string;
  city: string;
  startsAt: string;
  price: number | null;
}
export const simulations = [
  {
    title: "Arriver seul·e à une soirée jeux",
    context:
      "Tu arrives et les tables se remplissent. L’organisatrice est disponible.",
    choices: [
      [
        "« Bonjour, c’est ma première fois. Comment rejoindre une table ? »",
        "Elle peut t’orienter vers une table ouverte. Demander un repère est une façon simple de participer.",
        "« Je peux observer une manche avant de jouer ? »",
      ],
      [
        "Tu observes un moment avant de t’approcher.",
        "Prendre tes repères est légitime. Tu peux ensuite demander s’il reste une place, ou partir si le cadre ne te convient pas.",
        "« Est-ce que cette place est libre ? »",
      ],
      [
        "« Je ne connais personne, je dois absolument me faire des amis ce soir. »",
        "Cette attente peut ajouter de la pression. Tu peux te donner un objectif plus léger : découvrir un jeu.",
        "« Je viens découvrir, vous conseillez quoi ? »",
      ],
    ],
  },
  {
    title: "Parler pendant une activité",
    context:
      "Pendant une pause d’atelier, une personne regarde sa création près de toi.",
    choices: [
      [
        "« Qu’est-ce qui t’a donné envie d’essayer cet atelier ? »",
        "Une question ouverte peut lancer un échange. Écoute et laisse aussi la personne choisir de répondre brièvement.",
        "« Moi, j’avais envie de tester quelque chose de nouveau. Et toi ? »",
      ],
      [
        "« J’aime bien cette couleur. »",
        "Une remarque sur l’activité permet un contact léger. Une réponse courte ne signifie rien sur ta valeur.",
        "Tu souris, puis reprends ton activité si l’échange ne continue pas.",
      ],
      [
        "Tu préfères profiter de la pause en silence.",
        "Le silence est une option valable. Tu peux apprécier l’activité sans devoir engager une conversation.",
        "Tu reprends l’atelier à ton rythme.",
      ],
    ],
  },
  {
    title: "Proposer de se revoir",
    context:
      "La discussion a été agréable et réciproque. La séance se termine.",
    choices: [
      [
        "« Ça te dirait de revenir à une prochaine séance ensemble ? »",
        "Une proposition claire et légère laisse une vraie liberté. Une réponse hésitante invite à ne pas insister.",
        "La personne dit qu’elle ne sait pas encore. Tu réponds : « Aucun souci, bonne soirée ! »",
      ],
      [
        "« Je te laisse mon contact si tu as envie de reparler de tout ça. »",
        "Proposer plutôt qu’exiger un contact respecte le choix de l’autre. Il n’y a aucune garantie de suite.",
        "Tu laisses l’autre décider sans relancer immédiatement.",
      ],
      [
        "« Il faut absolument qu’on se revoie demain. »",
        "L’enthousiasme est compréhensible. Demander ce qui conviendrait à l’autre laisse davantage de place à la réciprocité.",
        "« Si ça te dit, on pourrait se recroiser ici. »",
      ],
    ],
  },
];
