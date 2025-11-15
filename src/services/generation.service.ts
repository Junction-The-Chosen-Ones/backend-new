import { ai_conf } from "../config/openai";

export async function generateText(prompt: string): Promise<string> {
  const chatCompletions = await ai_conf.chat.completions.create({
    model: "mistralai/Mistral-7B-Instruct-v0.2",
    max_tokens: 4096,
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      { role: "user", content: prompt },
    ],
  });

  return chatCompletions.choices[0].message?.content ?? "";
}
