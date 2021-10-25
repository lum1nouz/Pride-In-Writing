import requests
from bs4 import BeautifulSoup
import pandas as pd

# response = requests.get(
#     url="https://en.wikipedia.org/wiki/List_of_LGBT_writers",
# )
# soup = BeautifulSoup(response.content, 'html.parser')

# table = soup.find_all('table')
df = pd.read_html("https://en.wikipedia.org/wiki/List_of_LGBT_writers")
for x in range(25):
  print(df[x])

# Retrieve the list of all the publishers
# sections = soup.find_all("table", {"class": "wikitable"})

# # Go for all the sections of A, B, C, etc.
# for section in sections:
#   rows = section.find_all("tr")
#   for row in rows:
#     column = row.find_all("td")
#     # column = column[0].find("a")
#     print(column)
    # print(row)
    # print()
  # print(rows.prettify())
  # # Retrieve the list of the sections
  # uls = section.find("ul")
  # # Get each publisher from the list
  # for li in uls.find_all("li"):
  #     print(li.text)
