import OpenAI from "openai";

export const image_gen = new OpenAI({
  apiKey: process.env.OPENAI_KEY, // ← real OpenAI key
  baseURL: "https://api.openai.com/v1", // optional, defaults to this
});
