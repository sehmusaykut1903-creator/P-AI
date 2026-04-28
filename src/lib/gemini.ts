import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.GEMINI_API_KEY;

if (!API_KEY) {
  console.warn("GEMINI_API_KEY is not set in environment variables.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY || "" });

export const generatePsychInsight = async (metrics: any, language: string = 'tr') => {
  try {
    const prompt = `
      You are an elite sports psychiatrist AI for P-AI (Psyche Athlete Intelligence).
      Analyze the following athlete metrics and provide a brief, professional clinical insight.
      
      Athlete Metrics:
      ${JSON.stringify(metrics)}
      
      Language: ${language}
      
      Format:
      1. Mental Stability Score (0-100)
      2. Risk Level (Stable, Mild, Warning, Critical)
      3. Observations (Clinical style)
      4. Recommendations
      
      Be direct, evidence-based, and empathetic.
    `;
    
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });
    
    return response.text || "Report generation failed. Please try again later.";
  } catch (error) {
    console.error("Gemini Insight Generation Error:", error);
    return "Report generation failed. Please try again later.";
  }
};
