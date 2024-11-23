'use server'
import { streamText } from 'ai';
import { llm_model } from '@/lib/llm';

export async function GET() {
  // Make a request to OpenAI's API based on
  // a placeholder prompt
  const response = await streamText({
    model: llm_model,
    messages: [{ role: 'user', content: 'Say this is a test' }],
  });

  // Respond with the stream
  return response.toTextStreamResponse({
    headers: {
      'Content-Type': 'text/event-stream',
    },
  });

}

export async function POST(request: Request) {
  // Make a request to OpenAI's API based on
  // a placeholder prompt

  const user_data = await request.json();
  const question = user_data.question;

  const response = await streamText({
    model: llm_model,
    messages: [{ role: 'user', content: question }],
  });

  // Respond with the stream
  return response.toTextStreamResponse({
    headers: {
      'Content-Type': 'text/event-stream',
    },
  });


 

const comment = await request.json();
const comments = []; // Define the comments array
const newComment = {
  id: comments.length + 1,
  text: comment.text,
};
comments.push(newComment);
return new Response(JSON.stringify(newComment), {
  headers: {
    "Content-Type": "application/json",
  },
  status: 201,
});
}



