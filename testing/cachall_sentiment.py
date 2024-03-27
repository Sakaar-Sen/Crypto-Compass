import requests
import time


url = "http://127.0.0.1:5000/"

s = requests.Session()

access_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTcwNjk0NzQ1NCwianRpIjoiNTIzZDhiMDMtNDE5NC00NmRiLWEwM2QtNzg5ODlkZjFlM2U1IiwidHlwZSI6ImFjY2VzcyIsInN1YiI6InBybyIsIm5iZiI6MTcwNjk0NzQ1NCwiZXhwIjoxNzA2OTgzNDU0LCJpZGVudGl0eSI6InRlc3QifQ.Ru0v_pcF9mUUTxaoGGd2VRing1I-8iUXfIqTn5qW2lI"



cookies = {"access_token_cookie": access_token}

r = s.get(url + 'api/news', cookies=cookies)
data = r.json()
print(r.status_code)

for i in data:
    title = i['title']
    
    r = s.post(url + 'api/news/sentiment', json={"title": title}, cookies=cookies)
    print(r.status_code)
    data = r.json()
    with open("sentiment.txt", "a", encoding="utf-8") as f:
        f.write(title + " " + data['sentiment'] + "\n\n\n")
    time.sleep(0.1)