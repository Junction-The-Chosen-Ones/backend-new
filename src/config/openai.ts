import OpenAI from "openai";

export const ai_conf = new OpenAI({
  baseURL: process.env.BASE_URL,
  apiKey: process.env.API_KEY,
});
