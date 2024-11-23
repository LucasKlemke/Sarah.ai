// import { google } from '@ai-sdk/google';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import 'dotenv/config';

const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
const llmModel = process.env.GOOGLE_GENERATIVE_AI_MODEL;

const google = createGoogleGenerativeAI({
  apiKey: apiKey,
});

export const llm_model = google(llmModel as string, {
  safetySettings: [
    {
      category: 'HARM_CATEGORY_HARASSMENT',
      threshold: 'BLOCK_NONE',
    },
    {
      category: 'HARM_CATEGORY_HATE_SPEECH',
      threshold: 'BLOCK_NONE',
    },
    {
      category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
      threshold: 'BLOCK_NONE',
    },
    {
      category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
      threshold: 'BLOCK_NONE',
    },
  ],
});
