import requests
from bs4 import BeautifulSoup
import csv

response = requests.get(
    url="https://en.wikipedia.org/wiki/Abaddon_Books",
)
soup = BeautifulSoup(response.content, 'html.parser')

csv_file = open("info.csv", "w")
csv_writer = csv.writer(csv_file)

# Retrieve the list of all the publishers
sections = soup.find("table", {"class": "infobox vcard"})
if sections.find("td", {"class": "infobox-image"}):
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
    print(None)
  elif labelUnparsed.find("a"):
    label = labelUnparsed.find("a")
    print(label.text)
  else:
    label = labelUnparsed
    print(label.text)

  if dataUnparsed == None:
    print(None)
  elif dataUnparsed.find("a"):
    data = dataUnparsed.find("a")
    print(data.text)
  else:
    data = dataUnparsed
    print(data.text)

  print()