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
    csv_writer.writerow(["name", "image", "origin", "publication_types", "founded", "parent_comp", "hq", "website"])

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
                parseLink(link, dict, csv_writer, a.text)

        if(index == 26):
            break
        index += 1
    
    for i in dict:
        print(str(i) + ": " + str(dict[i]))
        csv_writer.writerow([i, dict[i]])

def parseLink(link, dict, csv_writer, name):
    
    try:
        response = requests.get(
            url=link,
        )
    except Exception as e:
        return
    soup = BeautifulSoup(response.content, 'html.parser')
    answers = {"name": name, "image": "-1", "Country of origin": "Unknown", "Publication types": "Unknown", "Founded": "Unknown", "Parent company": "Unkown", "Headquarters location": "Unknown", "Official website": "Not available"}
    


    # csv_file = open("info.csv", "w")
    # csv_writer = csv.writer(csv_file)

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
        answers["image"] = image
    else:
        pass

    sections = sections.find("tbody")

    # name = ""
    # origin = "" 
    # publication_types = ""
    # founded = ""
    # parent_comp = "" 
    # hq = ""
    # website = ""


    for section in sections:
        # print(section.prettify())
        # print()
        labelUnparsed = section.find("th")
        dataUnparsed = section.find("td")
        if labelUnparsed == None:
            continue
        elif labelUnparsed.find("a") and checkValues(labelUnparsed.find("a").text):
            if dataUnparsed == None:
                continue
            elif dataUnparsed.find("a"):
                output = dataUnparsed.find("a").text.replace("&nbsp", " ")
                answers[labelUnparsed.find("a").text] = output
            else:
                output = dataUnparsed.text.replace("&nbsp", " ")
                answers[labelUnparsed.find("a").text] = output
        else:
            if checkValues(labelUnparsed.text):
                if dataUnparsed == None:
                    continue
                elif dataUnparsed.find("a"):
                    output = dataUnparsed.find("a").text.replace("&nbsp", " ")
                    answers[labelUnparsed.text] = output
                else:
                    output = dataUnparsed.text.replace("&nbsp", " ")
                    answers[labelUnparsed.text] = output
    csv_writer.writerow([answers["name"], answers["image"], answers["Country of origin"], answers["Publication types"], answers["Founded"], answers["Parent company"], answers["Headquarters location"], answers["Official website"]])

def checkValues(string):
    options = ["Country of origin", "Publication types", "Founded", "Parent company", "Headquarters location", "Official website"]
    for option in options:
        if option == string:
            return True
    return False


def addVal(string, dict):
    if dict.get(string) == None:
        dict[string] = 1
    else:
        dict.update({string: dict.get(string) + 1})

main()

