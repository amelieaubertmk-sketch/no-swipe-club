import { createContext, useContext } from "react";
import type { AppState } from "../types";
interface Context {
  state: AppState;
  update: (s: AppState) => void;
  error: boolean;
}
export const Store = createContext<Context>(null!);
export const useStore = () => useContext(Store);
