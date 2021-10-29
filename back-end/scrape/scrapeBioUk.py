import pandas as pd
from bs4 import BeautifulSoup
import requests
import csv


def main():
    response = requests.get(
        url="https://en.wikipedia.org/wiki/Category:Book_publishing_companies_of_the_United_Kingdom",
    )
    soup = BeautifulSoup(response.content, "html.parser")

    csv_file = open("publishersUKBio.csv", "w")
    csv_writer = csv.writer(csv_file)
    csv_writer.writerow(["name", "bio"])

    # Retrieve the list of all the publishers
    sections = soup.find_all("div", {"class": "mw-category-group"})

    # Go for all the sections of A, B, C, etc.
    index = 0
    for section in sections:
        if index != 0:
            # Retrieve the list of the sections
            uls = section.find("ul")
            # Get each publisher from the list
            for li in uls.find_all("li"):
                for a in li.find_all("a"):
                    link = "https://en.wikipedia.org" + a["href"]
                    parseLink(link, csv_writer, a.text)

            if index == 16:
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
    paragraph = sections.find("p")
    if paragraph == None:
        csv_writer.writerow([name, "NaN"])
        return "NaN"
    else:
        paragraph = sections.find("p")

    print(name)
    print(paragraph)
    print(paragraph.text)
    print()
    csv_writer.writerow([name, paragraph.text])


main()
# parseLink("https://en.wikipedia.org/wiki/Caio_Fernando_Abreu",None,"Caio Fernando Abreu")
