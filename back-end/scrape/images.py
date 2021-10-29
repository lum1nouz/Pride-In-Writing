import pandas as pd
from bs4 import BeautifulSoup
import requests
import csv


def main():
    response = requests.get(
        url="https://en.wikipedia.org/wiki/List_of_LGBT_writers",
    )
    soup = BeautifulSoup(response.content, "html.parser")

    csv_file = open("authorImages.csv", "w")
    csv_writer = csv.writer(csv_file)
    csv_writer.writerow(["name", "image"])

    sections = soup.find_all("table", {"class": "wikitable"})

    # Go for all the sections of A, B, C, etc.
    for section in sections:
        rows = section.find_all("tr")
        for row in rows:
            try:
                column = row.find("td")
                a = column.find("a")
                link = "https://en.wikipedia.org" + a["href"]
                print(parseLink(link, csv_writer, a.text))
            except Exception as e:
                pass


def parseLink(link, csv_writer, name):
    try:
        response = requests.get(
            url=link,
        )
    except Exception as e:
        return "NaN"
    soup = BeautifulSoup(response.content, "html.parser")

    # Retrieve the list of all the publishers
    sections = soup.find("table", {"class": "infobox vcard"})
    if sections == None:
        sections = soup.find("table", {"class": "infobox"})
        if sections == None:
            return
    checkImg = sections.find("td", {"class": "infobox-image"})
    if checkImg == None:
        pass
    elif sections.find("td", {"class": "infobox-image"}):
        image = sections.find("img")
        image = "https:" + str(image["src"])
        csv_writer.writerow([name, image])
        return image
    else:
        pass
    csv_writer.writerow([name, "NaN"])
    return "NaN"


main()
