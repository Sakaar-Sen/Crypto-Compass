from requests_html import HTMLSession
from bs4 import BeautifulSoup

def scrape_news(url):
    s = HTMLSession()
    response = s.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')
    final = ""
    for p in soup.find_all('p')[:-3]:
        final += p.text

    return final