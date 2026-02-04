
import { GoogleGenAI } from "@google/genai";

// Use a getter to handle potential missing API keys gracefully
const getAIClient = () => {
  const apiKey = process.env.API_KEY || '';
  if (!apiKey) return null;
  return new GoogleGenAI({ apiKey });
};

export const generatePropertyDescription = async (details: {
  title: string;
  type: string;
  location: string;
  bedrooms: number;
  features: string[];
}): Promise<string> => {
  try {
    const ai = getAIClient();
    if (!ai) return "AI Assistant unavailable. Please enter description manually.";

    const prompt = `Write a professional, enticing real estate description for a ${details.type} called "${details.title}" located in ${details.location}. It has ${details.bedrooms} bedrooms and includes these features: ${details.features.join(', ')}. Keep it between 100-150 words. Focus on lifestyle benefits.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        temperature: 0.7,
        topP: 0.8,
        topK: 40,
      }
    });

    return response.text || "Could not generate description at this time.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Error generating AI description. Please write manually.";
  }
};
