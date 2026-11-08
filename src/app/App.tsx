import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import {
  HashRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { Shell } from "../components/Shell";
import { initialState, readState, saveState } from "../lib/storage";
import { Dashboard } from "../pages/Dashboard";
import { Explorer } from "../pages/Explorer";
import { Landing } from "../pages/Landing";
import { Library } from "../pages/Library";
import { MissionPage } from "../pages/MissionPage";
import { NotFound } from "../pages/NotFound";
import { Onboarding } from "../pages/Onboarding";
import { ProgressPage } from "../pages/ProgressPage";
import { Result } from "../pages/Result";
import { SettingsPage } from "../pages/SettingsPage";
import { Simulations } from "../pages/Simulations";
import type { AppState } from "../types";
import { Store, useStore } from "./store";
function Scroll() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}
function Require({ children }: { children: ReactNode }) {
  const { state } = useStore();
  return state.plan.length ? children : <Navigate to="/diagnostic" replace />;
}
export default function App() {
  const [state, setState] = useState<AppState>(() => {
    try {
      return readState(localStorage);
    } catch {
      return initialState();
    }
  });
  const [error, setError] = useState(false);
  function update(s: AppState) {
    setState(s);
    try {
      setError(!saveState(localStorage, s));
    } catch {
      setError(true);
    }
  }
  return (
    <Store.Provider value={{ state, update, error }}>
      <HashRouter>
        <Scroll />
        <Shell>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/diagnostic" element={<Onboarding />} />
            <Route
              path="/resultat"
              element={
                <Require>
                  <Result />
                </Require>
              }
            />
            <Route
              path="/dashboard"
              element={
                <Require>
                  <Dashboard />
                </Require>
              }
            />
            <Route
              path="/missions"
              element={
                <Require>
                  <Library />
                </Require>
              }
            />
            <Route
              path="/mission/:id"
              element={
                <Require>
                  <MissionPage />
                </Require>
              }
            />
            <Route
              path="/explorer"
              element={
                <Require>
                  <Explorer />
                </Require>
              }
            />
            <Route path="/simulations" element={<Simulations />} />
            <Route
              path="/bilan"
              element={
                <Require>
                  <ProgressPage />
                </Require>
              }
            />
            <Route path="/parametres" element={<SettingsPage />} />
            <Route path="/confidentialite" element={<SettingsPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Shell>
      </HashRouter>
    </Store.Provider>
  );
}
