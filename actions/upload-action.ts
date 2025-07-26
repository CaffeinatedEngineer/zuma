"use server";
import { generateSummaryFromOpenAI } from "@/lib/openai";
import { fetchAndExtractPdfText } from "@/lib/langchain";
import { generateSummaryFromGemini } from "@/lib/geminiai";
import { generateBasicSummary } from "@/lib/fallback-summary";

export async function generatePDFSummary(
  uploadResponse: { url: string; name: string }[] | null
) {
  if (!uploadResponse || uploadResponse.length === 0) {
    return {
      success: false,
      message: "No upload response",
      data: null,
    };
  }
  console.log(uploadResponse);
  const { url: pdfUrl, name: fileName }: { url: string; name: string } =
    uploadResponse[0];
  if (!pdfUrl) {
    return {
      success: false,
      message: "file upload failed",
      data: null,
    };
  }
  try {
    const pdfText = await fetchAndExtractPdfText(pdfUrl);
    console.log(pdfText);
    let summary;

    // Try OpenAI first
    try {
      summary = await generateSummaryFromOpenAI(pdfText);
      console.log('✅ OpenAI summary generated successfully');
      console.log('📄 OpenAI Summary Content:');
      console.log('=' .repeat(50));
      console.log(summary);
      console.log('=' .repeat(50));
    } catch (err) {
      console.log('❌ OpenAI failed, trying Gemini:', err);
      
      // Always try Gemini as fallback regardless of OpenAI error type
      try {
        summary = await generateSummaryFromGemini(pdfText);
        console.log('✅ Gemini summary generated successfully');
        console.log('📄 Gemini Summary Content:');
        console.log('=' .repeat(50));
        console.log(summary);
        console.log('=' .repeat(50));
      } catch (geminiError) {
        console.error('❌ Both OpenAI and Gemini failed');
        console.error('OpenAI error:', err);
        console.error('Gemini error:', geminiError);
        
        // Provide more specific error messages
        const isOpenAIRateLimit = err instanceof Error && err.message === "RATE_LIMIT_EXCEEDED";
        const isGeminiRateLimit = geminiError instanceof Error && 
          (geminiError.message.includes('quota') || geminiError.message.includes('rate limit'));
        
        // Use fallback summary when both AI services fail
        console.log('🔄 Using fallback summary generator...');
        summary = generateBasicSummary(pdfText);
        console.log('✅ Fallback summary generated successfully');
        console.log('📄 Fallback Summary Content:');
        console.log('=' .repeat(50));
        console.log(summary);
        console.log('=' .repeat(50));
        
        // Still log the original errors for debugging
        console.warn('AI Services failed:', {
          openAI: err,
          gemini: geminiError,
          isOpenAIRateLimit,
          isGeminiRateLimit
        });
      }
    }

    if (!summary) {
      return {
        success: false,
        message: "Summary generation failed - no content returned",
        data: null,
      };
    }
    return {
      success: true,
      message: "summary generated",
      data: summary,
    };
  } catch (err) {
    console.error('PDF summary generation failed:', err);
    return {
      success: false,
      message: err instanceof Error ? err.message : "Summary generation failed",
      data: null,
    };
  }
}
