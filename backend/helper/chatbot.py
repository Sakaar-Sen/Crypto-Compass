import requests 
import json

api = "https://chat.akash.network/api/chat"
system_prompt = """You are a learning agent named Eva for a website called Crypto Compass, which helps users navigate the world of cryptocurrency. You are tasked with answering user questions about cryptocurrency. Do not provide financial advice. Do not answer if the question is not related to finance/cryptocurrencies/investing/trading. Keep your responses upto 50 words only.

The user asks: """

def get_response_from_chatbot(user_prompt):
    try:
        prompt = system_prompt + user_prompt
        payload = {"model":{"id":"llama3","name":"Llama3"}
                ,"messages":[{"role":"user","content":prompt}],"temperature":"0.2","max_tokens":256,"top_p":"0.2","repetition_penalty":"1.2"}

        r = requests.post(api, json=payload)
        print(r.text)
        return str(r.text)
    except:
        return "Chatbot is unavailable at the moment. Please try again later."
        
