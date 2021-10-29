from flask import Flask, render_template, request, jsonify

# from flask_cors import CORS
import requests
import time
import urllib
import os
import json


import numpy as np
import pandas as pd

prhData = pd.read_csv(r"./authors-prh.csv")  # ,Name,OnTour,Summary,Link
lgbtData = pd.read_csv(
    r"./filtered_authors.csv"
)  # Name,Lifetime,Nationality,Genre,Notable Works
counter = 0
author_list = []
for i in lgbtData.index:
    counter2 = 0
    author_name = str(lgbtData["Name"][i])
    counter += 1
    for j in prhData.index:
        if str(prhData["Name"][j]).find(author_name) != -1:
            author_list.append(
                {
                    "Name": prhData["Name"][j],
                    "Year Born": lgbtData["Lifetime"][i],
                    "Nationality": lgbtData["Nationality"][i],
                    "Genre": lgbtData["Genre"][i],
                    "Notable Works": lgbtData["Notable Works"][i],
                    "OnTour": prhData["OnTour"][j],
                    "Link": prhData["Link"][j],
                    "Summary": prhData["Summary"][j],
                }
            )


print(counter)

finalAuthorsDataFrames = pd.DataFrame.from_dict(author_list)

finalAuthorsDataFrames.drop_duplicates(subset="Name", keep=False, inplace=True)

finalAuthorsDataFrames.to_csv("authors-prefinaldata.csv", encoding="utf-8")
