/**
 * Basic text-based summary fallback when AI services are unavailable
 */
export function generateBasicSummary(pdfText: string): string {
  if (!pdfText || pdfText.trim().length === 0) {
    return "# 📄 Document Summary\n\n❌ No content available for summarization.";
  }

  // Basic text processing
  const sentences = pdfText
    .split(/[.!?]+/)
    .map(s => s.trim())
    .filter(s => s.length > 20) // Only meaningful sentences
    .slice(0, 5); // Take first 5 sentences

  const wordCount = pdfText.split(/\s+/).length;
  const pageEstimate = Math.ceil(wordCount / 250); // Rough page estimate

  return `# 📄 Document Summary

🔑 **Auto-generated summary (AI services temporarily unavailable)**

## 📊 Document Stats
- 📝 Word Count: ~${wordCount.toLocaleString()} words
- 📄 Estimated Pages: ~${pageEstimate}
- 🤖 Summary Type: Basic text extraction

## 🔍 Key Content Preview
${sentences.map((sentence, index) => `${index + 1}. ${sentence}.`).join('\n')}

---
*This is a basic summary generated when AI services are unavailable. For better summaries, please try again later when our AI services are restored.*`;
}
