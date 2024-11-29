import { streamText } from 'ai';
import { llm_model, llm_prompt } from '@/lib/llm';

export const maxDuration = 1;

export async function POST(request: Request) {
  const { messages } = await request.json();

  const response = streamText({
    model: llm_model,
    system:llm_prompt,
    messages: messages, 
  });

  // Respond with the stream
  return response.toDataStreamResponse();
}
