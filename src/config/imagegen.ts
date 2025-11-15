import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const base64Image = "data:image/jpeg;base64,.....";
const raw = base64Image.split(",")[1];

// Convert base64 → Blob
const bytes = Uint8Array.from(atob(raw), (c) => c.charCodeAt(0));
const blob = new Blob([bytes]); // no mimeType needed

// Upload
const fileUpload = await ai.files.upload({
  file: blob,
});

// Generate content
const response = await ai.models.generateContent({
  model: "gemini-2.0-flash",
  contents: [
    {
      role: "user",
      parts: [
        { text: "Tell me about this instrument" },
        { inlineData: { data: raw, mimeType: "image/jpeg" } },
      ],
    },
  ],
});

console.log(response.text);
