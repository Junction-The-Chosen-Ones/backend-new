import Elysia from "elysia";
import { Type } from "@sinclair/typebox";
import { image_gen } from "../config/image_gen";
import { prompts } from "../utils/prompts";

export const img = new Elysia({ prefix: "/img_gen" }).post(
  "/image",
  async ({ body, set }) => {
    const { prompt } = body as { prompt: string };

    try {
      const response = await image_gen.responses.create({
        model: "gpt-4.1-mini",
        input: `${prompts.card_img} ${prompt} `,
        tools: [{ type: "image_generation" }],
      });

      // Extract image base64
      const imageData = response.output
        .filter((o) => o.type === "image_generation_call")
        .map((o) => o.result);

      if (!imageData.length) {
        return new Response("Image generation failed", { status: 500 });
      }

      const imageBuffer = Buffer.from(imageData[0], "base64");

      // Set header correctly
      set.headers = { "Content-Type": "image/png" };

      return imageBuffer;
    } catch (err) {
      console.error(err);
      return new Response("Error generating image", { status: 500 });
    }
  },
  {
    body: Type.Object({ prompt: Type.String() }),
  },
);
