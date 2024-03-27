import requests
import time


url = "http://127.0.0.1:5000/"
data = {
    "username": "test",
    "password": "test"
}
s = requests.Session()

access_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTcwNjk4NTkyNCwianRpIjoiYzhmZTc4ODEtNGRkMS00MjNhLWJkYjUtNTc0NjcyOTJhNjljIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6InBybyIsIm5iZiI6MTcwNjk4NTkyNCwiZXhwIjoxNzA3MDIxOTI0LCJpZGVudGl0eSI6InRlc3QifQ.H64qAf5VtS1ffXlzkWR3Z28svtKy8vc3kggba1QC1aE"


cookies = {"access_token_cookie": access_token}

r = s.get(url + 'api/news', cookies=cookies)
data = r.json()
print(r.status_code)

for i in data:
    newsUrl = i['url']
    print(newsUrl)
    r = s.post(url + 'api/news/summary', json={"url": newsUrl}, cookies=cookies)
    print(r.status_code)
    data = r.json()
    with open("summary.txt", "a", encoding="utf-8") as f:
        f.write(newsUrl + " " + data['summary'] + "\n\n\n")
    time.sleep(0.1)