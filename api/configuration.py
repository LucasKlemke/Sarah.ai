import google.generativeai as genai
import os
from dotenv import load_dotenv
from prompt import anamnese_context

load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")
gemini_model = os.getenv("GEMINI_MODEL")

safety_settings = [
    {
        "category": "HARM_CATEGORY_HARASSMENT",
        "threshold": "BLOCK_NONE",
    },
    {
        "category": "HARM_CATEGORY_HATE_SPEECH",
        "threshold": "BLOCK_NONE",
    },
    {
        "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
        "threshold": "BLOCK_NONE",
    },
    {
        "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
        "threshold": "BLOCK_NONE",
    },
]

conversation_history = anamnese_context

genai.configure(api_key=api_key)

model = genai.GenerativeModel(
    safety_settings=safety_settings,
    model_name=gemini_model,
    system_instruction=f"Você é uma IA chamada Sarah, treinada  para realizar uma anamnese médica da forma mais humana e acolhedora possivel, converse como se estivesse conversando com alguem comum, via mensagem, com  com base no seguinte roteiro:{conversation_history}",
)

