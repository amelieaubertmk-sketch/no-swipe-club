import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Compass,
  Flower2,
  Leaf,
  Sun,
} from "lucide-react";
import { Link } from "react-router-dom";
import { tracks, trackText } from "../data/content";

import { useStore } from "../app/store";
import { Button } from "../components/UI";
export function Landing() {
  const { state } = useStore();
  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <div className="eyebrow">
            <span className="line" /> LOVE IS NOT LATE PRÉSENTE
          </div>
          <h1>
            NO SWIPE
            <br />
            <em>CLUB.</em>
            <Sun className="title-star" size={35} strokeWidth={1.3} />
          </h1>
          <p className="hero-description">Less swiping. More living.</p>
          <p className="intro">
            Tu veux rencontrer quelqu’un, mais les applications de rencontre ne
            sont pas ton truc ? Un programme de 7 jours pour retrouver confiance
            et créer de nouvelles occasions de rencontres dans la vraie vie. À
            ton rythme.
          </p>
          <Button to={state.plan.length ? "/dashboard" : "/diagnostic"}>
            {state.plan.length
              ? "Reprendre mon expérience"
              : "Créer mon plan gratuit"}
          </Button>
          <div className="hero-reassurance">
            <span>
              <Check size={14} /> Sans compte
            </span>
            <span>
              <Check size={14} /> Sans pression
            </span>
            <span>
              <Check size={14} /> 100 % toi
            </span>
          </div>
        </div>
        <div
          className="editorial"
          aria-label="Composition illustrée : un rendez-vous avec la vraie vie"
        >
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
          <div className="ticket">
            <span>LE MEILLEUR MATCH ?</span>
            <strong>
              Ta vie,
              <br />
              en <em>vrai.</em>
            </strong>
            <div className="ticket-flower">
              <Flower2 strokeWidth={1} />
            </div>
            <div className="ticket-bottom">
              <span>NO SWIPE CLUB</span>
              <ArrowUpRight />
            </div>
          </div>
          <div className="round-stamp">
            7 JOURS
            <br />
            <span>
              pour ouvrir
              <br />
              le champ des possibles
            </span>
            <Sun size={27} />
          </div>
          <div className="paper-note">
            <span>À FAIRE AUJOURD’HUI</span>
            <p>
              Sortir.
              <br />
              Être curieux·se.
              <br />
              <em>Laisser la vie faire.</em>
            </p>
            <div className="note-line" />
          </div>
          <span className="scribble">
            dehors, il se passe des choses <ArrowUpRight size={14} />
          </span>
          <Sun className="little-spark" size={42} strokeWidth={1.3} />
        </div>
      </section>
      <div className="manifesto-strip">
        <span>PAS DE SWIPE</span>
        <Flower2 />
        <span>PAS DE MATCHING</span>
        <Flower2 />
        <span>PAS DE PRESSION</span>
        <Flower2 />
        <span>JUSTE DES POSSIBILITÉS</span>
        <Flower2 />
      </div>
      <section className="section problem">
        <div className="section-heading">
          <div>
            <span className="eyebrow">ON SE COMPREND</span>
            <h2>
              Et si on faisait
              <br />
              <em>autrement ?</em>
            </h2>
          </div>
          <p>
            On ne te trouve pas quelqu’un.
            <br />
            On t’aide à créer les occasions
            <br />
            de rencontrer quelqu’un.
          </p>
        </div>
        <div className="three-cols">
          {[
            [
              "01",
              "Tu pensais avoir trouvé ta personne.",
              "Après une histoire, il y a aussi la tienne. Retrouve ce qui te fait du bien, sans te presser.",
            ],
            [
              "02",
              "Le premier pas ? Pas si simple.",
              "Pas besoin de devenir extraverti·e. Les petites actions ouvrent aussi de grandes portes.",
            ],
            [
              "03",
              "Tu préfères les gens aux profils.",
              "Moins de conversations qui tournent en rond. Plus d’activités qui te ressemblent.",
            ],
          ].map(([n, t, d]) => (
            <article className="problem-item" key={n}>
              <span className="number">{n}</span>
              <h3>{t}</h3>
              <p>{d}</p>
            </article>
          ))}
        </div>
      </section>
      <section id="approche" className="section approach">
        <span className="eyebrow">LE PLAN EST SIMPLE</span>
        <h2>
          Pas une nouvelle appli.
          <br />
          <em>Un nouvel élan.</em>
        </h2>
        <div className="three-cols">
          {[
            [
              "01 / ON T’ÉCOUTE",
              "Un point de départ qui est le tien.",
              "Quelques questions sur tes envies, ton rythme et ce qui t’anime.",
            ],
            [
              "02 / ON COMPOSE",
              "Sept jours, pensés pour toi.",
              "Un plan personnalisé qui combine confiance, reconstruction et vie sociale.",
            ],
            [
              "03 / TU EXPLORES",
              "Des petits pas dans la vraie vie.",
              "Une mission par jour, trois intensités. Tu gardes toujours le choix.",
            ],
          ].map(([n, t, d]) => (
            <article key={n}>
              <span className="eyebrow">{n}</span>
              <h3>{t}</h3>
              <p>{d}</p>
            </article>
          ))}
        </div>
        <Link className="text-link" to="/diagnostic">
          Comment ça marche ? Essaie le diagnostic <ArrowRight size={17} />
        </Link>
      </section>
      <section className="section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">TROIS DIMENSIONS. TON PROPRE MIX.</span>
            <h2>
              À chacun·e
              <br />
              <em>son point de départ.</em>
            </h2>
          </div>
          <p>
            Tu n’entres pas dans une case.
            <br />
            Ton parcours combine ce dont
            <br />
            tu as besoin aujourd’hui.
          </p>
        </div>
        <div className="three-cols track-cards">
          {tracks.map((t, i) => (
            <article key={t} className={`track-card track-${i}`}>
              <span className="eyebrow">0{i + 1} / LE PARCOURS</span>
              {i === 0 ? (
                <Leaf size={45} strokeWidth={1} />
              ) : i === 1 ? (
                <Sun size={45} strokeWidth={1} />
              ) : (
                <Compass size={45} strokeWidth={1} />
              )}
              <h3>{t}</h3>
              <p>{trackText[t]}</p>
              <Link to="/diagnostic" aria-label={`Découvrir ${t}`}>
                <ArrowUpRight />
              </Link>
            </article>
          ))}
        </div>
      </section>
      <section className="demo-section section">
        <div>
          <span className="eyebrow">UN APERÇU DE TA NOUVELLE ROUTINE</span>
          <h2>
            Un peu moins
            <br />
            dans ta tête.
            <br />
            <em>Un peu plus dehors.</em>
          </h2>
          <p>
            Dix minutes peuvent suffire pour commencer.
            <br />
            Chaque action compte, même la plus petite.
          </p>
          <Button to="/diagnostic">Découvrir mon parcours</Button>
        </div>
        <article className="demo-card">
          <span className="eyebrow">APERÇU · JOUR 01 / 07</span>
          <div className="demo-top">
            <Sun size={35} />
            <span>10 MIN · RYTHME DOUX</span>
          </div>
          <h3>
            Suivre
            <br />
            ta curiosité.
          </h3>
          <p>
            Repère une activité liée à une passion. Juste une piste, sans
            obligation de t’inscrire.
          </p>
          <div className="progress-line">
            <i style={{ width: "14%" }} />
          </div>
          <span>Un petit pas pour toi. Un grand oui à la vraie vie.</span>
        </article>
      </section>
      <section className="section commitments">
        <span className="eyebrow">NOTRE PROMESSE, SANS GRANDES PROMESSES</span>
        <h2>
          Ni formule magique.
          <br />
          <em>Ni course à l’amour.</em>
        </h2>
        <p>
          Pas de swipe. Pas de matching. Pas de pression.
          <br />
          Et aucune promesse de trouver l’amour en sept jours.
        </p>
      </section>
      <section className="final-cta">
        <Flower2 size={48} strokeWidth={1} />
        <h2>
          Ta prochaine histoire commence
          <br /> peut-être par <em>une nouvelle habitude.</em>
        </h2>
        <Button to="/diagnostic" light>
          Commencer l’expérience
        </Button>
        <p>7 jours · Gratuit · Sans compte · À ton rythme</p>
      </section>
    </>
  );
}
