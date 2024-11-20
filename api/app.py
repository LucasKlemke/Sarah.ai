from fastapi import Request, FastAPI, APIRouter, Body
from pydantic import BaseModel
from main import start_chat


app = FastAPI()

class userQuestion(BaseModel):
    question: str
    history: list = []


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.post("/ask_question")
async def ask_question(question: userQuestion):
    answer = start_chat(question.question, question.history)
    
    return answer
