import { SUMMARY_SYSTEM_PROMPT } from "@/utils/prompts";
import OpenAI from "openai";
import { rateLimiter, RATE_LIMITS } from './rate-limiter';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateSummaryFromOpenAI(pdfText: string) {
  // Check rate limit before making request
  const { maxCalls, windowMs } = RATE_LIMITS.OPENAI_FREE;
  if (!rateLimiter.canMakeRequest('openai', maxCalls, windowMs)) {
    const nextAvailable = rateLimiter.getNextAvailableTime('openai', maxCalls, windowMs);
    const waitTime = Math.max(0, nextAvailable - Date.now());
    
    if (waitTime > 0) {
      console.warn(`OpenAI rate limit reached. Waiting ${Math.ceil(waitTime / 1000)} seconds...`);
      await new Promise(resolve => setTimeout(resolve, waitTime));
    }
  }
  
  try {
    // Record the API call
    rateLimiter.recordCall('openai');
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: SUMMARY_SYSTEM_PROMPT },
        {
          role: "user",
          content: `Transform this document into an easy to read
           summary with contextually relevant emojis and proper markdown
           formatting:\n\n${pdfText}`,
        },
      ],
      temperature: 0.7,
      max_tokens: 1500,
    });

    return completion.choices[0].message.content;
  } catch (error: any) {
    if (error?.status === 429) {
      throw new Error("RATE_LIMIT_EXCEEDED");
    }
    throw error;
  }
}
