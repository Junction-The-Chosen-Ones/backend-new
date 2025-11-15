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
