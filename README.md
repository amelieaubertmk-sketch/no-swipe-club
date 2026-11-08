# NO SWIPE CLUB

**LOVE IS NOT LATE — Less swiping. More living.**

Prototype interactif en français : sept jours pour retrouver confiance et créer des occasions de rencontres dans la vraie vie. Aucun matching, compte, paiement, service d’IA externe ou promesse de trouver l’amour. Le produit n’est pas un service de thérapie.

## Installation et lancement

Prérequis : **Node.js 24 LTS** et npm (version testée : Node 24.22.1, npm 11.9.0).

```bash
npm ci
npm run dev
```

Ouvrir l’adresse indiquée par Vite, au chemin `/no-swipe-club/`. Le serveur écoute sur toutes les interfaces pour le développement cloud. Aucune variable d’environnement applicative, clé ou base de données n’est nécessaire.

```bash
npm run lint       # ESLint / TypeScript / règles des hooks
npm test           # 13 tests unitaires Vitest
npm run build      # vérification TypeScript + production dans dist/
npm run test:e2e   # 4 scénarios navigateur Playwright
npm run format    # formatage des sources
```

Pour les tests navigateur, installer Chromium une fois :

```bash
npx playwright install chromium
npm run test:e2e
```

Dans l’environnement cloud fourni, Chromium est déjà installé :

```bash
PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium npm run test:e2e
```

Les tests démarrent et arrêtent leur propre serveur Vite s’il n’y en a pas déjà un. Les tests utilisent un contexte de navigateur isolé et n’effacent pas les données de votre navigateur personnel.

## Fonctionnalités

- Landing éditoriale originale bordeaux/crème, compositions CSS et icônes Lucide, sans fausses photos ou témoignages.
- Diagnostic de 15 étapes : retour arrière, sélections multiples, ville facultative, choix de persistance. Les préférences sont modifiables.
- Trois indices explicables et combinables : RESTART, CONFIDENCE et REAL LIFE.
- 21 missions éditoriales, sept par dimension. Le moteur construit sept missions uniques avec objectif, durée, difficulté, étapes, matériel, trois intensités, réflexion facultative et critère de réalisation.
- Tableau de bord, historique, missions à découvrir/en cours/terminées/passées/reportées ; aucun verrou de 24 heures.
- Explorer : neuf catégories classées selon les passions, conseils tenant compte du budget et du cadre social ; recherche et vérification restent à faire auprès de sources officielles.
- Trois simulations : arrivée solo, conversation pendant une activité, proposition de se revoir. Chaque choix ouvre un retour et une suite possible, avec nouvel essai.
- Bilan des missions terminées, pistes explorées, activités à refaire et actions déclarées manuellement. Aisance avant/après facultative ; bilan final après sept missions ou clôture volontaire.
- Paramètres : consentement révocable, reprise locale, nouveau programme, suppression confirmée, page de confidentialité et 404.
- Navigation mobile inférieure, labels, focus visibles, formulaire clavier, dialogue natif avec gestion du focus et prise en compte du mouvement réduit.

## Personnalisation déterministe

Le calcul est centralisé dans `src/lib/engine.ts`. Chaque dimension commence à 10 ; les résultats sont plafonnés à 100. L’âge ne modifie pas les scores.

| Réponse                                 | Effet                                     |
| --------------------------------------- | ----------------------------------------- |
| Rupture longue récente                  | RESTART +40                               |
| Récemment séparé·e                      | RESTART +15                               |
| Reconstruction personnelle              | RESTART +35                               |
| Aisance sociale 1 à 5                   | CONFIDENCE +(5 − réponse) × 12 ; défaut 3 |
| Difficulté timidité ou confiance        | CONFIDENCE +30                            |
| Commencer par la confiance              | CONFIDENCE +20                            |
| Applications « Pas pour moi »           | REAL LIFE +30                             |
| Manque d’occasions                      | REAL LIFE +25                             |
| Commencer par rencontres ou vie sociale | REAL LIFE +20                             |

La dimension au score le plus élevé est principale ; les autres sont affichées comme secondaires à partir de 30. En cas d’égalité, l’ordre stable est RESTART, CONFIDENCE, REAL LIFE. La séquence donne les jours 1, 2, 4 et 7 au parcours principal, les jours 3 et 6 au deuxième, et le jour 5 au troisième s’il atteint 30 (sinon au principal). L’index du jour sélectionne une mission distincte de la catégorie. En reconstruction ou après une rupture, aucune mission demandant de garder le contact n’est sélectionnée. Les conseils des missions réutilisent passions, budget, disponibilités et cadre préféré. L’intensité reste librement modifiable sur chaque mission.

Exemples couverts par les tests :

| Profil de test                                     | RESTART | CONFIDENCE | REAL LIFE |
| -------------------------------------------------- | ------- | ---------- | --------- |
| Séparation récente, reconstruction, aisance 4      | 100     | 22         | 10        |
| Aisance 1, timidité, priorité confiance            | 10      | 100        | 10        |
| Aisance 5, refus des apps, occasions et rencontres | 10      | 10         | 85        |

Ces valeurs ne mesurent pas la personnalité ni la santé mentale. Les forces affichées reposent sur les intérêts réellement sélectionnés, pas sur des qualités supposées.

## Données et confidentialité

L’état versionné est géré par `src/lib/storage.ts`, sous la seule clé `no-swipe-club:v1`. Avec accord explicite, le diagnostic complet, le plan et les actions sont conservés en localStorage. Sans accord, tout fonctionne en mémoire : une actualisation ou fermeture perd cette session. La révocation supprime la copie persistante immédiatement.

Les données ne sont ni chiffrées ni synchronisées. Elles peuvent être consultées par une personne ayant accès au navigateur et disparaître si son stockage est nettoyé. La suppression concerne uniquement la clé de cette application. Aucune donnée de tiers ne doit être saisie. Les polices libres DM Sans et DM Serif Display sont intégrées aux fichiers locaux ; aucune requête vers Google Fonts, aucun analytics ou cookie publicitaire. L’hébergeur reçoit uniquement les requêtes de fichiers et peut gérer ses journaux techniques selon sa politique.

## Architecture

```text
src/
  app/          routage HashRouter, état et contexte React
  components/   structure commune, boutons, listes, dialogue accessible
  pages/        une page par fichier : diagnostic, missions, bilan, etc.
  data/         questions, 21 missions, activités et simulations
  lib/          calcul déterministe, persistance et tests unitaires
  types/        contrats TypeScript explicites
  styles.css    tokens visuels, responsive, focus, mouvement réduit
  main.tsx      point d’entrée et polices locales
 e2e/           parcours Playwright
```

React 19, TypeScript, Vite, React Router, Lucide ; CSS natif pour ce design system sans dépendance Tailwind supplémentaire. Les contenus et la logique métier sont séparés de l’interface. Le contrat `AppState` et les fonctions de stockage pourront être remplacés par un service backend authentifié ; aucune synchronisation n’est simulée. Un contrat `VerifiedEvent` prépare l’ajout d’événements sourcés et datés sans en inventer aujourd’hui.

## Déploiement gratuit GitHub Pages

1. Ajouter les fichiers au dépôt `amelieaubertmk-sketch/no-swipe-club`, puis créer un commit et pousser sur `main`.
2. Dans **Settings → Pages → Build and deployment**, choisir **GitHub Actions** comme source.
3. Le workflow `.github/workflows/deploy.yml` installe les dépendances verrouillées, exécute lint, tests unitaires, tests navigateur et build. Après réussite sur `main`, il publie `dist/` avec les actions officielles GitHub Pages.
4. Consulter l’exécution dans **Actions** et l’URL publiée dans **Settings → Pages**. L’URL attendue est `https://amelieaubertmk-sketch.github.io/no-swipe-club/` ; elle ne sera active qu’après un déploiement réussi.

`vite.config.ts` utilise `base: '/no-swipe-club/'`. Le `HashRouter` conserve les routes après `#`, ce qui permet de recharger une page interne sans réécriture serveur. Si le dépôt est renommé ou si un domaine racine est choisi, adapter `base` et les chemins du test navigateur. Les pull requests exécutent les validations sans déployer. Aucun secret applicatif : le workflow utilise les autorisations GitHub Pages natives.

Le projet a été construit et testé localement ; aucun push, déploiement distant ou publication de l’environnement cloud n’est effectué automatiquement par cette livraison.

## Limites et évolutions

- Les « jours » désignent les sept étapes du programme, pas un calendrier verrouillé.
- Aucun événement local vérifié, réservation, messagerie, matching, rappel ou géolocalisation automatique.
- Les sorties, conversations et ressentis sont déclaratifs ; les simulations présentent des possibilités, pas des prédictions.
- Modifier les préférences régénère le plan. Si les missions changent, leurs statuts sont remis à zéro ; les compteurs d’actions restent conservés.
- Accessibilité vérifiée par navigation et tests fonctionnels, mais pas d’audit WCAG exhaustif ni de validation sur un iPhone physique.
- Évolutions possibles : tests utilisateurs, audit d’accessibilité, catalogue d’événements vérifiés, export volontaire des données, service backend sécurisé avec choix explicite de synchronisation.

## Correction du déploiement et de la 404 sur `main.tsx`

La console du site publié signalait une 404 sur `main.tsx`. Cela établit que le document servi chargeait l’entrée TypeScript source au lieu du JavaScript compilé. L’ancien `index.html` à la racine était précisément une entrée Vite de développement (`/src/main.tsx`) ; le servir tel quel avec GitHub Pages ne pouvait pas démarrer React. Le workflow versionné publiait déjà `dist`, mais la capture ne permet pas d’établir pourquoi GitHub servait encore le document source (ancienne publication, source effective ou cache).

La correction sépare désormais explicitement les deux entrées :

- **`web/index.html`** : document source éditable pour Vite ; il charge `/src/main.tsx` via un alias Vite vers les sources. Le serveur de développement utilise `web` comme racine.
- **`dist/index.html`** : document de production créé par Vite. Il charge `/no-swipe-club/assets/index-….js` et le CSS compilé, jamais `main.tsx`.
- **`index.html` et `assets/` à la racine** : copie de production générée automatiquement par `npm run build`, à versionner. Elle évite de renvoyer une entrée TypeScript si GitHub sert la racine du dépôt. `scripts/export-static.mjs` refuse d’exporter un document source. Les anciens fichiers hachés sont conservés pour les navigateurs ayant une ancienne page en cache.

Ne pas modifier manuellement le `index.html` généré ni les fichiers de `assets/`. Après toute modification de l’application, exécuter le build et inclure ces fichiers générés dans le commit. Les modifications du design et de l’application restent dans `src/`, celles du document source dans `web/index.html`.

Le `base` reste `/no-swipe-club/` et le routage reste `HashRouter`. Il existe un seul workflow versionné, `.github/workflows/deploy.yml`. Celui-ci installe avec `npm ci`, teste, construit, vérifie les deux publications statiques, puis utilise `actions/upload-pages-artifact` avec **`path: dist` exclusivement**, suivi de `actions/deploy-pages`. Le job de déploiement possède `pages: write` et `id-token: write`. Aucun workflow versionné ne publie les sources.

Validation reproductible :

```bash
npm ci
npm run lint
npm test
npm run build
npm run test:e2e
npm run test:production
PAGES_DIRECTORY=. npm run test:production
```

Dans le cloud fourni, préfixer les commandes Playwright avec `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium`. Ailleurs, installer Chromium avec `npx playwright install chromium`. `PAGES_DIRECTORY` choisit uniquement le dossier servi par le serveur de test, sans effet dans l’application.

Les tests vérifient les parcours fonctionnels, les réponses HTTP et types MIME des JS/CSS/polices, les chemins sous `/no-swipe-club/assets/`, l’absence d’entrée TypeScript dans le HTML publié, l’égalité entre l’index racine et l’index construit, le rechargement d’une route interne et le message affiché lorsqu’un bundle manque. Le serveur statique ne transforme aucun fichier et renvoie 404 pour les fichiers absents.

Après un déploiement vert, ouvrir `https://amelieaubertmk-sketch.github.io/no-swipe-club/` (avec « amelie »). Dans le code source de la page, chercher le script : il doit se terminer par un fichier `.js` dans `/no-swipe-club/assets/`. Dans l’onglet Réseau, ce fichier et le CSS doivent répondre 200 ; aucune requête `main.tsx` ne doit être envoyée. Si le navigateur conserve une ancienne page, recharger sans cache ou essayer une fenêtre privée.

L’accès direct au site publié et à l’API Actions depuis l’environnement cloud était refusé par le proxy ; la réussite distante du redéploiement n’est pas vérifiable depuis cette machine tant que les autorisations réseau ne sont pas appliquées. Les tests locaux portent sur les véritables fichiers statiques construits, et non uniquement sur le serveur de développement.
