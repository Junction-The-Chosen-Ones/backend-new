import { image_gen } from "../config/image_gen";


/**
 * Generate image bytes from a prompt using Google GenAI REST API
 */
let lastGeneratedImage: Buffer | null = null;

async function generateImage(prompt: string) {
  const response = await image_gen.responses.create({
    model: "gpt-4.1-mini",
    input: prompt,
    tools: [{ type: "image_generation" }],
  });

  const imageData = response.output
    .filter((output) => output.type === "image_generation_call")
    .map((output) => output.result);

  if (imageData.length > 0) {
    lastGeneratedImage = Buffer.from(imageData[0], "base64");
    return true;
  }

  return false;
}
