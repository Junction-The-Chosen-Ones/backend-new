import { ai_conf } from "../config/openai";

export const prompts = {
  entity_prompt: `Generate an array of 11 entities with the following properties as a JSON object:
 {
   "id": number,
   "name": string,
   "is_enemy": boolean,
   "description": string,
   "attack": number,
   "defense": number,
   "health": number
 }
 1 entity should have is_enemy set to false. the other are to true. Try to make the one that is false 20% higher attack, health, and defense values.
 Return only the JSON object (no extra text, no explanation).`,
  story_intro_prompt:
    "Generate a short introductory story for my FantasyDungeon crawler. I want 2 paragraphs of introduction in the lore of this game.",
  story_dialog_prompt: `Generate a short dialog for my FantasyDungeon crawler for these characters:`,
  story_dialog_prompt_2: `I want at least 2 lines for each character. Please return ONLY a valid JSON. the json struct : export interface Dialogs {
    id: string;
    characterId: string;
    content: string;
  }`,
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
