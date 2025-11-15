export interface Entity {
  id: number;
  name: string;
  description: string;
  attack: number;
  defense: number;
  health: number;
}
export interface Dialog {
  id: string;
  characterId: string;
  content: string;
}
export interface Dialog extends Array<Dialog> {}

// nodes: {
//   id: string;
//   parent?: string[] | null | undefined;
//   children?: string[] | null | undefined;
//   content: string;
// };
export interface Story {
  entities: Entity[];
  dialogs: Dialog[];
  context: string;
}
// Enums
export enum ActionType {
  Attack = "attack",
  Defend = "defend",
  Heal = "heal",
  Special = "special",
}

export enum DamageType {
  Physical = "physical",
  Elemental = "elemental",
  Holy = "holy",
  Dark = "dark",
}

// Interface for Card
export interface Card {
  name: string;
  desc: string;
  cost: number;
  cardType: ActionType[];
  damageType: DamageType[];
  amount: number[];
  spriteLink: string;
}
