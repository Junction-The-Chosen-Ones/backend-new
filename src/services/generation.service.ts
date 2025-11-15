// generation.service.ts
import { ai_conf } from "../config/openai";
import { prompts } from "../utils/prompts";
import { Entity, Dialog, Story } from "../models/models";

// ------------------------------
// AI Text generation helper
// ------------------------------
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

// ------------------------------
// Helper to extract first JSON array from AI output
// ------------------------------
function extractJsonArray(raw: string): string {
  const match = raw.match(/\[.*\]/s);
  if (!match) throw new Error("No JSON array found in AI output");
  return match[0];
}

// ------------------------------
// Generate Entities
// ------------------------------
export async function generateEntities(): Promise<Entity[]> {
  try {
    const entitiesRaw = await generateText(prompts.entity_prompt);
    const jsonString = extractJsonArray(entitiesRaw);

    let entities: Entity[];
    try {
      entities = JSON.parse(jsonString) as Entity[];
    } catch (err) {
      console.error("Failed to parse entities JSON:", jsonString);
      throw err;
    }

    return entities;
  } catch (err) {
    console.error("Error generating entities:", err);
    throw err;
  }
}

// ------------------------------
// Generate Intro Story
// ------------------------------
export async function generateIntro(): Promise<string> {
  try {
    const intro = await generateText(prompts.story_intro_prompt);
    return intro;
  } catch (err) {
    console.error("Error generating intro:", err);
    throw err;
  }
}

// ------------------------------
// Generate Dialogs
// ------------------------------
export async function generateDialogs(entities: Entity[]): Promise<Dialog[]> {
  try {
    const prompt = `
You are an API. Return ONLY valid JSON.
No explanation, no comments, no extra text.

Generate dialogs for these entities: ${JSON.stringify(entities)}

The output MUST be a JSON array like:

[
  {
    "id": "string",
    "characterId": "string",
    "content": "string"
  }
]

Rules:
- Each entity must have at least two dialog lines
- characterId must match the "id" field from the entity JSON
`;

    const dialogsRaw = await generateText(prompt);
    const jsonString = extractJsonArray(dialogsRaw);

    let dialogs: Dialog[];
    try {
      dialogs = JSON.parse(jsonString) as Dialog[];
    } catch (err) {
      console.error("Failed to parse dialogs JSON:", jsonString);
      throw err;
    }

    return dialogs;
  } catch (err) {
    console.error("Error generating dialogs:", err);
    throw err;
  }
}

// ------------------------------
// Generate Full Story
// ------------------------------
export const generateStory = async (): Promise<Story> => {
  try {
    const entities = await generateEntities();
    const dialogs = await generateDialogs(entities);
    const context = await generateIntro();
    console.log("Generated context:", entities);
    console.log("Generated context:", context);
    console.log("Generated dialogs:", dialogs);

    const story: Story = { entities, dialogs, context };
    return story;
  } catch (err) {
    console.error("Error generating story:", err);
    throw err;
  }
};
