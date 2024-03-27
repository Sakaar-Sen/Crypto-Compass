import requests
# from collections import OrderedDict

def get_sentiment(title):
    model="lxyuan/distilbert-base-multilingual-cased-sentiments-student"

    API_URL = "https://api-inference.huggingface.co/models/{0}".format(model)
    API_TOKEN = "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"

    headers = {"Authorization": f"Bearer {API_TOKEN}", "wait_for_model" : "true"}
    def query(payload):
        response = requests.post(API_URL, headers=headers, json=payload)
        return response.json()

    data = query(title)
    print(data)
    data = data[0]
    max_dict = max(data, key=lambda x: x['score'])
    # print(max_dict['label'])
    return max_dict['label']



