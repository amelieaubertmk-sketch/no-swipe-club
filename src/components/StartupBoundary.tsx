import { Component } from "react";
import type { ReactNode } from "react";

/** Keep a render failure visible rather than leaving an empty React root. */
export class StartupBoundary extends Component<
  { children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    if (this.state.failed)
      return (
        <main className="workspace" role="alert">
          <h1>L’application n’a pas pu s’afficher.</h1>
          <p>
            Une erreur a interrompu l’affichage. Vos données locales n’ont pas
            été effacées.
          </p>
          <p>
            Essayez de recharger la page. Si le problème persiste, signalez le
            message présent dans la console du navigateur.
          </p>
          <button className="button" onClick={() => window.location.reload()}>
            Réessayer
          </button>
        </main>
      );
    return this.props.children;
  }
}
