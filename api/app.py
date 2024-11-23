from fastapi import FastAPI, HTTPException
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from typing import List
from configuration import model  # Assuming this initializes your LLM model

app = FastAPI()

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["http://localhost:3000"],  # Allow only your frontend origin
#     allow_credentials=True,
#     allow_methods=["*"],  # Allow all HTTP methods (GET, POST, etc.)
#     allow_headers=["*"],  # Allow all headers
# )


# Define the request model
class UserQuestion(BaseModel):
    question: str
    history: List[str] = []


@app.get("/")
def read_root():
    return {"message": "Welcome to the LLM chat API"}


@app.post("/ask_question")
async def ask_question(question: UserQuestion):
    """
    Endpoint to handle a user's question and return a streamed response from the model.
    """
    # Validate and start a chat session with the model
    try:
        chat_session = model.start_chat(history=question.history)
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Failed to start chat session: {str(e)}"
        )

    # Send the user's input to the chat session with streaming enabled
    user_input = question.question
    try:
        response = chat_session.send_message(user_input, stream=True)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to send message: {str(e)}")

    # Define an asynchronous generator for streaming response
    async def event_generator():
        try:
            async for chunk in response:
                yield f"data: {chunk.text}\n\n"  # Format for SSE
        except Exception as e:
            yield f"data: [ERROR] {str(e)}\n\n"

    # Return a StreamingResponse with the event generator
    return StreamingResponse(event_generator(), media_type="text/event-stream")
