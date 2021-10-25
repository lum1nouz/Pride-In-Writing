from flask import Flask, render_template, request, jsonify
#from flask_cors import CORS
import requests
import time
import urllib
import os
import json


import numpy as np
import pandas as pd

def createAuthorsCsv():
    def scrapeBestSellersAuthors():
        api_key = "d4huxgvevx94je6fp9eykxds"

        raw = requests.get(
            f"https://api.penguinrandomhouse.com/resources/v2/title/domains/PRH.US/authors?api_key={api_key}&rows=0"
        ).json()
        return raw
        
    authors_list = []
    counter = 0
    result = scrapeBestSellersAuthors()
    for author in result['data']['authors']: 
        link = ""
        on_tour = False
        summary = ""
        try:
            link = author['_links'][0]['href']
        except:
            link = ""
            # link = "https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png" 

        try:
            on_tour = author['ontour']
        except:
            on_tour = False   

        try:
            summary = author['spotlight']
        except:
            summary = ""   


        authors_list.append({'Name' : author['display'], 'OnTour' : on_tour, 'Summary': summary, 'Link': link})
        counter += 1

    authorsDataFrames = pd.DataFrame.from_dict(authors_list)
    
    authorsDataFrames.to_csv('authors-prh.csv', encoding = 'utf-8')




if __name__ == "__main__":
    createAuthorsCsv()
    # createQuotesCsv()
    # createBooksCsv()
    # createExtraField()
