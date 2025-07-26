import { GoogleGenerativeAI } from '@google/generative-ai';
import { SUMMARY_SYSTEM_PROMPT } from '@/utils/prompts';


const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export const generateSummaryFromGemini = async (pdfText: string) => {
  const MAX_RETRIES = 5;
  let retries = 0;

  while (retries < MAX_RETRIES) {
    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro-002',
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 1500,
        },
      });

      const prompt = { contents: [
        {
          role: 'user',
          parts: [{
            text: SUMMARY_SYSTEM_PROMPT
          },{
            text: `Transform this document into an engaging, easy-to-read summary with contextually relevant emojis and proper markdown formatting:\n\n${pdfText}`,
          }],
        },
      ]};

      const result = await model.generateContent(prompt);
      const response = await result.response;

      if(!response.text()){
          throw new Error('Gemini API failed to generate summary');
      }
      return response.text();
    } catch (error: any) {
      if (error?.status === 429) {
        retries++;
        const delay = Math.pow(2, retries) * 1000; // Exponential backoff
        console.warn(`Gemini API rate limit hit. Retrying in ${delay / 1000} seconds... (Attempt ${retries}/${MAX_RETRIES})`);
        await new Promise(resolve => setTimeout(resolve, delay));
      } else {
        console.error('Gemini API Error:', error);
        throw error;
      }
    }
  }
  throw new Error('Gemini API failed after multiple retries due to rate limiting.');
};
