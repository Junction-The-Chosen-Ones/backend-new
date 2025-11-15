import { extractJsonArray } from "../utils/json_utils";
import { generateText } from "../utils/prompts";

// export async function generateEntities(): Promise<Entity[]> {
//   const entitiesRaw = await generateText(prompts.entity_prompt);
//   const jsonString = extractJsonArray(entitiesRaw);

//   try {
//     return JSON.parse(jsonString) as Entity[];
//   } catch (err) {
//     console.error("Failed to parse entities JSON:", jsonString);
//     throw err;
//   }
// }
