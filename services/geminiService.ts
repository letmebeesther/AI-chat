import { GoogleGenAI } from "@google/genai";

// FIX: Removed the API key check. The guidelines specify to assume the API_KEY environment variable is always available.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function generateChatResponse(prompt: string): Promise<string> {
  const model = 'gemini-2.5-flash';
  
  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        systemInstruction: "You are a helpful and friendly AI assistant.",
      },
    });
    return response.text;
  } catch (error) {
    console.error("Error generating response from Gemini API:", error);
    throw new Error("Failed to get a response. The AI may be busy. Please try again later.");
  }
}
