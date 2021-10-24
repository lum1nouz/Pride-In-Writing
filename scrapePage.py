import requests
from bs4 import BeautifulSoup
import random

response = requests.get(
    url="https://en.wikipedia.org/wiki/A_%26_C_Black",
)
soup = BeautifulSoup(response.content, 'html.parser')

# Retrieve the list of all the publishers
sections = soup.find("tbody")
for section in sections:
  label = section.find("th", {"class": "infobox-label"})
  data = section.find("td", {"class": "infobox-data"})
  print(str(label.text) + ": " + str(data.text))

# # Go for all the sections of A, B, C, etc.
# for section in sections:
#   # Retrieve the list of the sections
#   uls = section.find("ul")
#   # Get each publisher from the list
#   for li in uls.find_all("li"):
#       print(li.text)
