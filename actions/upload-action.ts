"use server";
import { generateSummaryFromOpenAI } from "@/lib/openai";
import { fetchAndExtractPdfText } from "@/lib/langchain";

export async function generatePDFSummary(
  uploadResponse: [{ url: string; name: string }]
) {
  if (!uploadResponse) {
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

    try {
      const summary = await generateSummaryFromOpenAI(pdfText);
      console.log(summary);
    } catch (err) {
      console.log(err);
    }

    if (!summary) {
      return {
        success: false,
        message: "file upload failed",
        data: null,
      };
    }
    return {
      success: true,
      message: "summary generated",
      data: summary,
    };
  } catch (err) {
    return {
      success: false,
      message: "file upload failed",
      data: null,
    };
  }
}
