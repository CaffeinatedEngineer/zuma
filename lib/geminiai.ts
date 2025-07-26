import { GoogleGenerativeAI } from '@google/generative-ai';
import { SUMMARY_SYSTEM_PROMPT } from '@/utils/prompts';
import { rateLimiter, RATE_LIMITS } from './rate-limiter';


const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export const generateSummaryFromGemini = async (pdfText: string) => {
  // Input validation
  if (!pdfText || typeof pdfText !== 'string' || pdfText.trim().length === 0) {
    throw new Error('Invalid input: PDF text is empty or not provided');
  }

  // Check if text is too long (Gemini has token limits)
  const maxInputLength = 30000; // Conservative limit
  if (pdfText.length > maxInputLength) {
    console.warn(`PDF text is ${pdfText.length} characters, truncating to ${maxInputLength}`);
    pdfText = pdfText.substring(0, maxInputLength) + "\n\n[Content truncated due to length]";
  }

  const MAX_RETRIES = 5;
  let retries = 0;

  while (retries < MAX_RETRIES) {
    // Check rate limit before making request
    const { maxCalls, windowMs } = RATE_LIMITS.GEMINI_FREE;
    if (!rateLimiter.canMakeRequest('gemini', maxCalls, windowMs)) {
      const nextAvailable = rateLimiter.getNextAvailableTime('gemini', maxCalls, windowMs);
      const waitTime = Math.max(0, nextAvailable - Date.now());
      
      if (waitTime > 0) {
        console.warn(`Gemini rate limit reached. Waiting ${Math.ceil(waitTime / 1000)} seconds...`);
        await new Promise(resolve => setTimeout(resolve, waitTime));
      }
    }
    
    try {
      // Record the API call
      rateLimiter.recordCall('gemini');
      // Use Gemini Flash which has higher free tier limits
      const model = genAI.getGenerativeModel({ 
        model: 'gemini-1.5-flash',
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

      console.log('🤖 Calling Gemini API...');
      const result = await model.generateContent(prompt);
      const response = await result.response;
      
      console.log('📝 Gemini API Response Status:', {
        text: response.text() ? 'Text received' : 'No text',
        candidates: result.response.candidates?.length || 0,
        finishReason: result.response.candidates?.[0]?.finishReason
      });

      if(!response.text()){
          throw new Error('Gemini API failed to generate summary - no text in response');
      }
      
      const summaryText = response.text();
      console.log('✨ Gemini generated summary length:', summaryText.length, 'characters');
      
      return summaryText;
    } catch (error: any) {
      console.error('Gemini API Error details:', {
        message: error?.message,
        status: error?.status,
        code: error?.code,
        details: error?.details
      });
      
      if (error?.status === 429 || error?.message?.includes('quota') || error?.message?.includes('rate limit')) {
        retries++;
        if (retries >= MAX_RETRIES) {
          throw new Error(`Gemini API rate limit exceeded after ${MAX_RETRIES} retries`);
        }
        const delay = Math.pow(2, retries) * 1000; // Exponential backoff
        console.warn(`Gemini API rate limit hit. Retrying in ${delay / 1000} seconds... (Attempt ${retries}/${MAX_RETRIES})`);
        await new Promise(resolve => setTimeout(resolve, delay));
      } else {
        console.error('Gemini API non-retryable error:', error);
        throw new Error(`Gemini API failed: ${error?.message || 'Unknown error'}`);
      }
    }
  }
  throw new Error('Gemini API failed after multiple retries due to rate limiting.');
};
