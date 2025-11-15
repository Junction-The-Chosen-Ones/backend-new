// ------------------------------
// Robust JSON array extractor
// ------------------------------
export function extractJsonArray(raw: string): string {
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
