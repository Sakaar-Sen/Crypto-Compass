import requests
import time


url = "http://127.0.0.1:5000/"

s = requests.Session()




headers = {"Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTcxNTA2NjczMCwianRpIjoiZjI2NjdjYWEtZDI0Zi00NmJkLWFkYTQtMTFkZjUzNjM2YWMzIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6InBybyIsIm5iZiI6MTcxNTA2NjczMCwiZXhwIjoxNzE1NDI2NzMwLCJpZGVudGl0eSI6ImFkbWluMjMifQ.gVv45jToBGfKY0jbj0DWK-fxrhh494m99VeA2E0uMfw"}

r = s.get(url + 'api/news', headers=headers)
data = r.json()
print(r.status_code)

for i in data:
    try:
        title = i['title']
        
        r = s.post(url + 'api/news/sentiment', json={"title": title}, headers=headers)
        print(r.status_code)
        data = r.json()
        # with open("sentiment.txt", "a", encoding="utf-8") as f:
        #     f.write(title + " " + data['sentiment'] + "\n\n\n")
        time.sleep(0.1)
    except:
        print("Failed to get sentiment for title: ", title)