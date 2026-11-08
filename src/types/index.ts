export type Track = "RESTART" | "CONFIDENCE" | "REAL LIFE";
export type Answers = Partial<Record<string, string | string[]>>;
export type Status =
  "À découvrir" | "En cours" | "Terminée" | "Passée" | "Reportée";
export interface Mission {
  id: string;
  track: Track;
  title: string;
  description: string;
  goal: string;
  duration: number;
  difficulty: number;
  materials: string;
  steps: string[];
  soft: string;
  standard: string;
  ambitious: string;
  reflection: string;
  criterion: string;
}
export interface AppState {
  version: 1;
  answers: Answers;
  plan: string[];
  statuses: Record<string, Status>;
  explored: string[];
  favorites: string[];
  outings: number;
  conversations: number;
  before: string;
  after: string;
  closed: boolean;
}
