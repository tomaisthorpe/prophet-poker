import { Player } from "./player";

export interface Session {
  id: string;
  name: string;
  players: Player[];
  stories: Story[];
  currentStory: number;
}

export interface PlayerChoices {
  id: string;
  card: string;
}

export interface Story {
  id: number;
  name: string;
  playerChoices: PlayerChoices[];
  revealed: boolean;
}
