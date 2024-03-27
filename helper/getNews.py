import requests
import requests
from pprint import pprint
from datetime import datetime
import time

def get_news(limit=1000):
    url = "https://news.treeofalpha.com/api/news?limit={}".format(limit)

    r = requests.get(url)
    if r.status_code == 200:
        data = r.json()

    filteredData = []
    for i in data:
        if i['source'] == 'Blogs' and i['url'].startswith("https://cointelegraph.com"):
            filteredData.append(i)
    # print(len(filteredData))

    response = []

    for i in filteredData:
        publishTime = datetime.fromtimestamp(i['time']/1000)
        publishTime = publishTime.strftime("%H:%M %d-%m-%Y")
        title = i['title'][15:]
        # print(publishTime, title)
        response.append({"publishTime": publishTime, "title": title, "url": i['url']})

    return response

