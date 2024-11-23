import { streamText } from 'ai';
import { llm_model } from '@/lib/llm';

export const maxDuration = 1;

export async function POST(request: Request) {
  const { messages } = await request.json();

  const response = streamText({
    model: llm_model,
    system:
      'Você é uma IA muito inteligente! Possui uma linguagem extremamente culta e fala com deveras elegancia',
    messages: messages,
  });

  // Respond with the stream
  return response.toDataStreamResponse();
}
