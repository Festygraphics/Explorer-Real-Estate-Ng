
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generatePropertyDescription = async (details: {
  title: string;
  type: string;
  location: string;
  bedrooms: number;
  features: string[];
}): Promise<string> => {
  try {
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
