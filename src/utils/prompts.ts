import { ai_conf } from "../config/openai";

export const prompts = {
  entity_prompt: `Generate an array of 12 entities with the following properties as a JSON object:
 {
   "id": number,
   "name": string,
   "is_enemy": boolean,
   "description": string,
   "attack": number,
   "defense": number,
   "health": number,
   "is_boss": boolean;
 }
 1 entity should have is_enemy set to false and have 20% higher attack the other are to true. Also one of the other entities need to be a boss and have 40% more attributes., health, and defense values.
 Return only the JSON object (no extra text, no explanation).`,
  story_intro_prompt:
    "Generate a short introductory story for my FantasyDungeon crawler. I want 2 paragraphs of introduction in the lore of this game.",
  story_dialog_prompt: `Generate a short dialog for my FantasyDungeon crawler for these characters:`,
  story_dialog_prompt_2: `I want at least 2 lines for each character. Please return ONLY a valid JSON. the json struct : export interface Dialogs {
    id: string;
    characterId: string;
    content: string;
  }`,
  cards_prompt: `Generate 30 cards with the following properties as a JSON object:
{
name: string;
desc: string;
cost: number;
cardType: ActionType[];
damageType: DamageType[];
amount: number[];
spriteLink: string;}
and here are action types and damage types:
{
  Attack = "attack",
  Defend = "defend",
  Heal = "heal",
  Special = "special",
}
{
  Physical = "physical",
  Elemental = "elemental",
  Holy = "holy",
  Dark = "dark",
}
 Return only the JSON object (no extra text, no explanation).`,
  card_img:
    "generate me an pixel art sprite of the size 30x16px of a card with that will present this description",
  reinit_prompt:
    "can you generate like a continuation for this json story files, change it but keep the same idea. Here is the json",
};

export async function generateText(prompt: string): Promise<string> {
  const chatCompletions = await ai_conf.chat.completions.create({
    model: "beyoru/Luna-Fusion-RP",
    max_tokens: 4096,
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      { role: "user", content: prompt },
    ],
  });

  return chatCompletions.choices[0].message?.content ?? "";
}
