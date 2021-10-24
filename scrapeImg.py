import requests
from bs4 import BeautifulSoup
import random

response = requests.get(
    url="https://en.wikipedia.org/wiki/University_of_Nebraska_Press",
)
soup = BeautifulSoup(response.content, 'html.parser')

# Retrieve the list of all the publishers
sections = soup.find("tbody")
image = sections.find("img")
print(image["src"])
print()

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

  # print(section.find("th"))
  # print(section.find("td"))
  # print()
  # if(section.find("a")):
  #   print(True)
  # else:
  #   print(False)

  # print()
  # if(section.find("img")):
  #   image = section.find("img")
  #   print(image)
  
  # if (section.tr.th.find("a")):
  #   print(True)

  # if(section.tr.th.find("a")):
    # label = sections.find("a")
  # label = section.find("th", {"class": "infobox-label"})
  # data = section.find("td", {"class": "infobox-data"})
  # print(str(label.text) + ": " + str(data.text))