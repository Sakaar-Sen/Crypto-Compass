import requests
from helper.scrapeNewsFromUrl import scrape_news

   
def query(payload):
    model="Falconsai/text_summarization"
    API_URL = "https://api-inference.huggingface.co/models/{0}".format(model)
    API_TOKEN = ""
    headers = {"Authorization": f"Bearer {API_TOKEN}", "wait_for_model": "true"}
    response = requests.post(API_URL, headers=headers, json=payload)
    
    return response.json()

def summarize(url):
    # url = "https://cointelegraph.com/news/ethereum-dencun-upgrade-launch-date-scheduled-next-week"
    scrapedNews = scrape_news(url)
    data = query(scrapedNews)
    text = data[0]['summary_text']
    return str(text)    

# x = summarize("https://cointelegraph.com/news/ethereum-dencun-upgrade-launch-date-scheduled-next-week")
# print(x)
