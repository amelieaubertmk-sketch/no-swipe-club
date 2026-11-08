import { Button } from "../components/UI";
export function NotFound() {
  return (
    <section className="section result">
      <span className="eyebrow">404 · UN PETIT DÉTOUR</span>
      <h1>
        Cette piste
        <br />
        <em>ne mène nulle part.</em>
      </h1>
      <p>Il y a d’autres occasions à explorer.</p>
      <Button to="/">Revenir au club</Button>
    </section>
  );
}
