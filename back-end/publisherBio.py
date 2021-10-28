import requests
from bs4 import BeautifulSoup
import csv


def main():
    response = requests.get(
        url="https://en.wikipedia.org/wiki/List_of_English-language_book_publishing_companies",
    )
    soup = BeautifulSoup(response.content, "html.parser")

    csv_file = open("publisherbio.csv", "w")
    csv_writer = csv.writer(csv_file)
    csv_writer.writerow(["name", "bio"])

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
                parseLink(link, csv_writer, a.text)

        if index == 26:
            break
        index += 1



def parseLink(link, csv_writer, name):

    try:
        response = requests.get(
            url=link,
        )
    except Exception as e:
        return "NaN"
    soup = BeautifulSoup(response.content, "html.parser")

    sections = soup.find("div", {"class": "mw-parser-output"})
    try:
      paragraph = sections.find("p")
    except Exception as e:
        csv_writer.writerow([name, "NaN"])
        return "NaN"
    # for a in paragraph.find_all("a"):
    #     a.extract()

    print(name)
    print(paragraph.text)
    print()
    csv_writer.writerow([name, paragraph.text])


main()
