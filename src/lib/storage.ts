import type { AppState } from "../types";
export const KEY = "no-swipe-club:v1";
export const initialState = (): AppState => ({
  version: 1,
  answers: {},
  plan: [],
  statuses: {},
  explored: [],
  favorites: [],
  outings: 0,
  conversations: 0,
  before: "",
  after: "",
  closed: false,
});
export interface StorageLike {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
}
export function readState(storage: StorageLike): AppState {
  try {
    const s = JSON.parse(storage.getItem(KEY) || "null");
    if (
      s?.version !== 1 ||
      !Array.isArray(s.plan) ||
      s.plan.length !== 7 ||
      !s.answers ||
      s.answers.consent !== "Oui, sur cet appareil" ||
      !s.statuses ||
      !Array.isArray(s.explored) ||
      !Array.isArray(s.favorites)
    )
      return initialState();
    return { ...initialState(), ...s };
  } catch {
    return initialState();
  }
}
export function saveState(storage: StorageLike, s: AppState) {
  try {
    if (s.answers.consent === "Oui, sur cet appareil")
      storage.setItem(KEY, JSON.stringify(s));
    else storage.removeItem(KEY);
    return true;
  } catch {
    return false;
  }
}
export function clearState(storage: StorageLike) {
  storage.removeItem(KEY);
}
