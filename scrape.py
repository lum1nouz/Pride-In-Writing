import requests
from bs4 import BeautifulSoup
import random
import csv

def main():
    response = requests.get(
        url="https://en.wikipedia.org/wiki/List_of_English-language_book_publishing_companies",
    )
    soup = BeautifulSoup(response.content, 'html.parser')

    csv_file = open("info.csv", "w")
    csv_writer = csv.writer(csv_file)

    # Retrieve the list of all the publishers
    sections = soup.find_all("div", {"class": "div-col"})

    # Go for all the sections of A, B, C, etc.
    index = 0
    dict = {}
    for section in sections:
        # Retrieve the list of the sections
        uls = section.find("ul")
        # Get each publisher from the list
        for li in uls.find_all("li"):
            for a in li.find_all("a"):
                link = "https://en.wikipedia.org" + a["href"]
                print(a.text)
                print("^^^^^^^^^^^")
                print()
                print(link)
                parseLink(link, dict)

        if(index == 26):
            break
        index += 1
    
    for i in dict:
        print(str(i) + ": " + str(dict[i]))
        csv_writer.writerow([i, dict[i]])

def parseLink(link, dict):
    
    try:
        response = requests.get(
            url=link,
        )
    except Exception as e:
        return
    soup = BeautifulSoup(response.content, 'html.parser')

    # csv_file = open("info.csv", "w")
    # csv_writer = csv.writer(csv_file)

    # Retrieve the list of all the publishers
    sections = soup.find("table", {"class": "infobox vcard"})
    if sections == None:
        sections = soup.find("table", {"class": "infobox"})
        if sections == None:
            return
    checkImg = sections.find("td", {"class": "infobox-image"})
    if  checkImg == None:
        image = "-1"
        print(str(image))
    elif sections.find("td", {"class": "infobox-image"}):
        image = sections.find("img")
        image = "https:" + str(image["src"])
    else:
        image = "-1"
        print(str(image))
        print()

    sections = sections.find("tbody")

    for section in sections:
        # print(section.prettify())
        # print()
        labelUnparsed = section.find("th")
        dataUnparsed = section.find("td")
        if labelUnparsed == None:
            continue
        elif labelUnparsed.find("a"):
            label = labelUnparsed.find("a")
            addVal(label.text, dict)
            print(label.text)
        else:
            label = labelUnparsed
            addVal(label.text, dict)
            print(label.text)

        if dataUnparsed == None:
            continue
        elif dataUnparsed.find("a"):
            data = dataUnparsed.find("a")
            print(data.text)
        else:
            data = dataUnparsed
            print(data.text)

        print()
    print("----------------------------------")

def addVal(string, dict):
    if dict.get(string) == None:
        dict[string] = 1
    else:
        dict.update({string: dict.get(string) + 1})

main()

