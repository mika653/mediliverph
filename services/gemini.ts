
import { GoogleGenAI, Type } from "@google/genai";
import { PrescriptionAnalysis } from "../types";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const analyzePrescription = async (base64Image: string): Promise<PrescriptionAnalysis> => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: {
      parts: [
        {
          inlineData: {
            mimeType: 'image/jpeg',
            data: base64Image,
          },
        },
        {
          text: "Extract medication details from this prescription. Use simple, clear English for senior citizens. Provide the medication name, dosage, timing (Morning, Afternoon, Evening, Before Bed), and instructions. Also provide a friendly summary of how to take these and any important warnings."
        }
      ]
    },
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          medications: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                id: { type: Type.STRING },
                name: { type: Type.STRING },
                dosage: { type: Type.STRING },
                timing: { type: Type.STRING, enum: ['Morning', 'Afternoon', 'Evening', 'Before Bed'] },
                frequency: { type: Type.STRING },
                instruction: { type: Type.STRING }
              },
              required: ['name', 'dosage', 'timing', 'instruction']
            }
          },
          summary: { type: Type.STRING },
          warnings: { type: Type.ARRAY, items: { type: Type.STRING } }
        },
        required: ['medications', 'summary', 'warnings']
      }
    }
  });

  try {
    return JSON.parse(response.text || '{}') as PrescriptionAnalysis;
  } catch (e) {
    throw new Error("Failed to parse AI response");
  }
};

export const getHealthGuidance = async (query: string, medications: any[]): Promise<string> => {
  const ai = getAI();
  const medContext = JSON.stringify(medications);
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `As a medical assistant for MediliverPH, answer the following question for a senior citizen. 
    User Question: ${query}
    Current Medications: ${medContext}
    Provide an answer in clear, simple English. Focus on being reassuring, professional, and easy to understand.`,
    config: {
      systemInstruction: "You are a professional and kind medical assistant for a Filipino telehealth platform called MediliverPH. Always use simple English. Advise consulting their physician for critical changes."
    }
  });

  return response.text || "I'm sorry, I didn't quite catch that. Could you please repeat your question?";
};
