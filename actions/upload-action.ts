"use server";

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
  } catch (err) {
    return {
      success: false,
      message: "file upload failed",
      data: null,
    };
  }
}
