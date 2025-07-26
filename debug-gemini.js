const { generateSummaryFromGemini } = require('./lib/geminiai.ts');

// Sample PDF text for testing
const samplePdfText = `
Project Specification Document

Title: AI-Powered Document Summarizer

Overview:
This project aims to create an intelligent document processing system that can automatically generate summaries from PDF documents using advanced AI technologies. The system will support multiple AI providers including OpenAI and Google's Gemini.

Key Features:
1. PDF text extraction using OCR and text parsing
2. AI-powered summary generation
3. Fallback mechanisms for reliability
4. User-friendly web interface
5. File upload and processing capabilities

Technical Requirements:
- Next.js framework for the frontend
- Server actions for backend processing
- Integration with OpenAI and Gemini APIs
- File upload handling with UploadThing
- Responsive design with Tailwind CSS

Expected Outcomes:
Users will be able to upload PDF documents and receive concise, well-formatted summaries that highlight the key points and important information from the original document.
`;

async function testGemini() {
  try {
    console.log('🧪 Testing Gemini summary generation...');
    console.log('📄 Sample text length:', samplePdfText.length, 'characters');
    console.log('');
    
    const summary = await generateSummaryFromGemini(samplePdfText);
    
    console.log('✅ TEST SUCCESSFUL!');
    console.log('Generated summary:');
    console.log('='.repeat(60));
    console.log(summary);
    console.log('='.repeat(60));
    
  } catch (error) {
    console.error('❌ TEST FAILED!');
    console.error('Error:', error.message);
    console.error('Full error:', error);
  }
}

testGemini();
