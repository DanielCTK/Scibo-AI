import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Sends an image to Gemini to extract handwriting.
 * @param base64Data The base64 string of the image (without the data:image/... prefix)
 * @param mimeType The mime type of the image (e.g., 'image/jpeg')
 * @returns The recognized text.
 */
export const recognizeHandwriting = async (base64Data: string, mimeType: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: {
        parts: [
          {
            inlineData: {
              data: base64Data,
              mimeType: mimeType,
            },
          },
          {
            text: "Transcribe the handwriting in this image into digital text. Please capture all text accurately, preserving the original structure where possible. Do not add any introductory or concluding remarks, just provide the text found in the image.",
          },
        ],
      },
    });

    return response.text || "No text recognized.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to recognize text. Please try again.");
  }
};