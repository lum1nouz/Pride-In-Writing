import pandas as pd
from bs4 import BeautifulSoup
import requests

response = requests.get(
    url="https://en.wikipedia.org/wiki/List_of_LGBT_writers",
)
soup = BeautifulSoup(response.content, 'html.parser')

sections = soup.find_all("table", {"class": "wikitable"})

# Go for all the sections of A, B, C, etc.
for section in sections:
  rows = section.find_all("tr")
  for row in rows:
    try:
      column = row.find("td")
      print(column.text)
    except Exception as e:
      pass
