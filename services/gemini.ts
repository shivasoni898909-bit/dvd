
import { GoogleGenAI } from "@google/genai";

// Always initialize GoogleGenAI with a named parameter using the process.env.API_KEY directly.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function getBeautyAdvice(userPrompt: string, history: { role: 'user' | 'model', parts: { text: string }[] }[]) {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        ...history,
        { role: 'user', parts: [{ text: userPrompt }] }
      ],
      config: {
        systemInstruction: "You are GlowBot, a friendly and expert beauty assistant for GlowCart. You recommend products from the catalog (Serums, Lipsticks, Masks, Fragrances, Beard Balm, Baby Wash). Provide advice on skincare routines, makeup tips, and ingredient analysis. Keep responses concise and encouraging.",
        temperature: 0.7,
      }
    });

    // Directly access the .text property from the GenerateContentResponse.
    return response.text || "I'm sorry, I'm having trouble thinking right now. How can I help you otherwise?";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I'm currently resting. Please try again in a moment!";
  }
}

export async function analyzeIngredients(ingredients: string[]) {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: { parts: [{ text: `Analyze these cosmetic ingredients and tell me their main benefits or if there are any sensitive skin warnings: ${ingredients.join(", ")}` }] },
      config: {
        temperature: 0.2,
      }
    });

    // Directly access the .text property from the GenerateContentResponse.
    return response.text || "Analysis unavailable.";
  } catch (error) {
    console.error("Analysis Error:", error);
    return "Failed to analyze ingredients.";
  }
}
