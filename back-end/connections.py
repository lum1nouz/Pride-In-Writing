from flask import Flask, render_template, request, jsonify
#from flask_cors import CORS
import requests
import time
import urllib
import os
import json


import numpy as np
import pandas as pd

#add indexes
authorsData = pd.read_csv(r'./authors/authors-prefinaldata.csv') #Ind,Name,Year Born,Nationality,Genre,Notable Works,OnTour,Link,Summary
authorsData = authorsData.drop("Ind", axis=1)
authorsData['id'] = range(0, len(authorsData))

authorsData['BookConnections'] = np.empty((len(authorsData), 0)).tolist()
authorsData['PublisherConnections'] = np.empty((len(authorsData), 0)).tolist()

booksData = pd.read_csv(r'./books/books-prefinaldata.csv') #id,name,genres,publisher,year,page_count,purchase_link,price,avg_rating,num_ratings,maturity_rating,language,description,image,authors

booksData['AuthorConnections'] = np.empty((len(booksData), 0)).tolist()
booksData['PublisherConnections'] = np.empty((len(booksData), 0)).tolist()

publishersData = pd.read_csv(r'./publishers/publishers-prefinaldata.csv') #name,image,origin,publication_types,founded,parent_comp,hq,website

publishersData['AuthorConnections'] = np.empty((len(publishersData), 0)).tolist()
publishersData['BookConnections'] = np.empty((len(publishersData), 0)).tolist()

publishersData['id'] = range(0, len(publishersData))

counter = 0

for autIndex in authorsData.index:
    for bookIndex in booksData.index:

        if (authorsData['Name'][autIndex] in booksData['authors'][bookIndex]) :
            authorsData['BookConnections'][autIndex].append(bookIndex)
            booksData['AuthorConnections'][bookIndex].append(autIndex)
            
            publisher = str(booksData['publisher'][bookIndex])

            for pubIndex in publishersData.index:
                if( publisher.find(str(publishersData['name'][pubIndex])) != -1):
                    if (autIndex not in publishersData['AuthorConnections'][bookIndex]):
                        publishersData['AuthorConnections'][bookIndex].append(autIndex)
                        authorsData['PublisherConnections'][autIndex].append(pubIndex)
                        counter += 1

                    booksData['PublisherConnections'][bookIndex].append(pubIndex)
                    publishersData['BookConnections'][pubIndex].append(bookIndex)

authorsData.to_csv('./authors/authors-finaldata.csv', encoding = 'utf-8')
booksData.to_csv('./books/books-finaldata.csv', encoding = 'utf-8')
publishersData.to_csv('./publishers/publishers-finaldata.csv', encoding = 'utf-8')

print(counter)