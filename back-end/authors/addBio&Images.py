from flask import Flask, render_template, request, jsonify
#from flask_cors import CORS
import requests
import time
import urllib
import os
import json


import numpy as np
import pandas as pd

authFinalData = pd.read_csv(r'./authors-finaldata.csv') 
bioData = pd.read_csv(r'./authorBio.csv') 
imageData = pd.read_csv(r'./authorImages.csv')
author_list = []
for i in authFinalData.index:
    author_name = str(authFinalData["Name"][i])
    found = False
    for j in imageData.index:
        if(str(imageData["name"][j]).find(author_name) != -1):
            author_list.append({'Name' : authFinalData["Name"][i], 'Year Born' :authFinalData["Year Born"][i], 'Nationality' : authFinalData["Nationality"][i],  'Genre' : authFinalData["Genre"][i], 'Notable Works' : authFinalData["Notable Works"][i], 'OnTour' : authFinalData["OnTour"][i],'Link': imageData["image"][j], 'Summary': authFinalData["Summary"][i], 'id' : authFinalData["id"][i], 'BookConnections': authFinalData["BookConnections"][i]})
            found = True
    if(not found):
        author_list.append({'Name' : authFinalData["Name"][i], 'Year Born' :authFinalData["Year Born"][i], 'Nationality' : authFinalData["Nationality"][i],  'Genre' : authFinalData["Genre"][i], 'Notable Works' : authFinalData["Notable Works"][i], 'OnTour' : authFinalData["OnTour"][i],'Link': authFinalData["Link"][i], 'Summary': authFinalData["Summary"][i], 'id' : authFinalData["id"][i], 'BookConnections': authFinalData["BookConnections"][i]})

imageAut = pd.DataFrame.from_dict(author_list)

imageAut.drop_duplicates(subset='Name', keep=False, inplace= True)
    
imageAut.to_csv('authors-stage1data.csv', encoding = 'utf-8')

authFinalData = pd.read_csv(r'./authors-stage1data.csv')
author_list = []
for i in authFinalData.index:
    author_name = str(authFinalData["Name"][i])
    found = False
    for j in bioData.index:
        if(str(bioData["name"][j]).find(author_name) != -1):
            author_list.append({'Name' : authFinalData["Name"][i], 'Year Born' :authFinalData["Year Born"][i], 'Nationality' : authFinalData["Nationality"][i],  'Genre' : authFinalData["Genre"][i], 'Notable Works' : authFinalData["Notable Works"][i], 'OnTour' : authFinalData["OnTour"][i],'Link': authFinalData["Link"][i], 'Summary': bioData["bio"][j], 'id' : authFinalData["id"][i], 'BookConnections': authFinalData["BookConnections"][i]}) 
            found = True
    if(not found):
        author_list.append({'Name' : authFinalData["Name"][i], 'Year Born' :authFinalData["Year Born"][i], 'Nationality' : authFinalData["Nationality"][i],  'Genre' : authFinalData["Genre"][i], 'Notable Works' : authFinalData["Notable Works"][i], 'OnTour' : authFinalData["OnTour"][i],'Link': authFinalData["Link"][i], 'Summary': authFinalData["Summary"][i], 'id' : authFinalData["id"][i], 'BookConnections': authFinalData["BookConnections"][i]})

finalAuthorsDataFrames = pd.DataFrame.from_dict(author_list)

finalAuthorsDataFrames.drop_duplicates(subset='Name', keep=False, inplace= True)
    
finalAuthorsDataFrames.to_csv('final-authordata.csv', encoding = 'utf-8')