from configuration import model


def start_chat(question: str, history):
    user_input = question
    print(history)

    historyArray = []
    
    if len(history) > 0:
        for entry in history:
            historyArray.append({"role": "user", "parts": [entry["question"]]})
            historyArray.append({"role": "model", "parts": [entry["answer"]]})

    print(historyArray)

    chat_session = model.start_chat(history=historyArray)

    response = chat_session.send_message(user_input)

    model_response = response.text

    return model_response
