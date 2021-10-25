import requests
from bs4 import BeautifulSoup
import random

def main():
    response = requests.get(
        url="https://en.wikipedia.org/wiki/List_of_English-language_book_publishing_companies",
    )
    soup = BeautifulSoup(response.content, 'html.parser')

    # Retrieve the list of all the publishers
    sections = soup.find_all("div", {"class": "div-col"})

    # Go for all the sections of A, B, C, etc.
    index = 0
    for section in sections:
        # Retrieve the list of the sections
        uls = section.find("ul")
        # Get each publisher from the list
        for li in uls.find_all("li"):
            for a in li.find_all("a"):
                link = "https://en.wikipedia.org" + a["href"]
                print(link)

        if(index == 26):
            break
        index += 1

def parseLink(url):
    print(url.title)

main()

