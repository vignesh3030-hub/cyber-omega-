
import { GoogleGenAI } from "@google/genai";
import { Alert, CloudLog } from "../types";

export const analyzeThreatWithAI = async (alert: Alert): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const modelName = 'gemini-3-flash-preview';
  
  const prompt = `
    Act as a senior Cloud Security Operations Center (SOC) analyst.
    Analyze the following security alert and provide a concise (2-3 paragraph) explanation of why this might be a credible insider threat or a potential false positive.
    
    Alert Details:
    - User: ${alert.userName} (${alert.userId})
    - Alert Type: ${alert.type}
    - Severity: ${alert.severity}
    - Description: ${alert.description}
    - Risk Score: ${alert.riskScore}
    
    Associated Audit Logs:
    ${JSON.stringify(alert.associatedLogs, null, 2)}
    
    Structure your response with:
    1. Threat Assessment (Likelihood of malicious intent)
    2. Potential Impact
    3. Recommended Next Steps for Investigation
  `;

  try {
    const response = await ai.models.generateContent({
      model: modelName,
      contents: prompt,
      config: {
        thinkingConfig: { thinkingBudget: 2000 }
      }
    });

    return response.text || "Unable to generate analysis at this time.";
  } catch (error) {
    console.error("Gemini AI Analysis failed:", error);
    return "The AI engine encountered an error while analyzing this incident. Please review logs manually.";
  }
};
