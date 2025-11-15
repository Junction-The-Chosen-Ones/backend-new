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
// Robust JSON array extractor
// ------------------------------
function extractJsonArray(raw: string): string {
  let cleaned = raw.trim();

  // Remove possible code fences ```json or ```
  cleaned = cleaned
    .replace(/^```json/i, "")
    .replace(/^```/, "")
    .replace(/```$/, "")
    .trim();

  const match = cleaned.match(/\[.*\]/s);
  if (!match) throw new Error("No JSON array found in AI output");
  return match[0];
}

// ------------------------------
// Generate Entities
// ------------------------------
export async function generateEntities(): Promise<Entity[]> {
  const entitiesRaw = await generateText(prompts.entity_prompt);
  const jsonString = extractJsonArray(entitiesRaw);

  try {
    return JSON.parse(jsonString) as Entity[];
  } catch (err) {
    console.error("Failed to parse entities JSON:", jsonString);
    throw err;
  }
}

// ------------------------------
// Generate Intro Story
// ------------------------------
export async function generateIntro(): Promise<string> {
  return generateText(prompts.story_intro_prompt);
}

// ------------------------------
// Generate Dialogs
// ------------------------------
export async function generateDialogs(entities: Entity[]): Promise<Dialog[]> {
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

  try {
    return JSON.parse(jsonString) as Dialog[];
  } catch (err) {
    console.error("Failed to parse dialogs JSON:", jsonString);
    throw err;
  }
}

// ------------------------------
// Generate Full Story (optimized)
// ------------------------------
export const generateStory = async (): Promise<Story> => {
  try {
    // Generate entities and intro in parallel (independent)
    const [entities, context] = await Promise.all([
      generateEntities(),
      generateIntro(),
    ]);

    // Generate dialogs after entities are ready
    const dialogs = await generateDialogs(entities);

    const story: Story = { entities, dialogs, context };

    console.log("Story generated successfully");
    return story;
  } catch (err) {
    console.error("Error generating story:", err);
    throw err;
  }
};
