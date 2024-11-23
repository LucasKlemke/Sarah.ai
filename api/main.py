from configuration import model


# def start_chat(question: str, history):
#     user_input = question
#     print(history)

#     historyArray = []

#     if len(history) > 0:
#         for entry in history:
#             historyArray.append({"role": "user", "parts": [entry["question"]]})
#             historyArray.append({"role": "model", "parts": [entry["answer"]]})

#     print(historyArray)

#     chat_session = model.start_chat(history=historyArray)

#     response = chat_session.send_message(user_input)

#     model_response = response.text

#     print(response.text)

#     return model_response


def start_chat():

    historyArray = []

    while True:
        chat_session = model.start_chat(history=historyArray)

        user_input = input("User: ")
        # response = chat_session.send_message(user_input)
        response = chat_session.send_message(user_input, stream=True)
        for chunk in response:
            print(chunk.text)

        print(chat_session.history)
        # print("Model: ", response.text)

        # historyArray.append({"role": "user", "parts": [user_input]})
        # historyArray.append({"role": "model", "parts": [response.text]})



