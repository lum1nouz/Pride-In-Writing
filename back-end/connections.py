from flask import Flask, render_template, request, jsonify

# from flask_cors import CORS
import requests
import time
import urllib
import os
import json


import numpy as np
import pandas as pd

# add indexes
authorsData = pd.read_csv(
    r"./authors/final-authordata.csv"
)  # Ind,Name,Year Born,Nationality,Genre,Notable Works,OnTour,Link,Summary
authorsData = authorsData.drop("i", axis=1)
authorsData = authorsData.drop("id", axis=1)
authorsData["id"] = range(0, len(authorsData))

authorsData["BookConnections"] = np.empty((len(authorsData), 0)).tolist()
authorsData["PublisherConnections"] = np.empty((len(authorsData), 0)).tolist()

booksData = pd.read_csv(
    r"./books/books-prefinaldata.csv"
)  # id,name,genres,publisher,year,page_count,purchase_link,price,avg_rating,num_ratings,maturity_rating,language,description,image,authors

booksData["AuthorConnections"] = np.empty((len(booksData), 0)).tolist()
booksData["PublisherConnections"] = np.empty((len(booksData), 0)).tolist()

publishersData = pd.read_csv(
    r"./publishers/publishers-stage2data.csv"
)  # name,image,origin,publication_types,founded,parent_comp,hq,website

publishersData = publishersData.drop("i", axis=1)

publishersData["AuthorConnections"] = np.empty((len(publishersData), 0)).tolist()
publishersData["BookConnections"] = np.empty((len(publishersData), 0)).tolist()

publishersData["id"] = range(0, len(publishersData))

counter = 0


def compList(x, val):
    isInList = False
    for temp in x:
        if val == temp:
            isInList = True
    return isInList


for autIndex in authorsData.index:
    for bookIndex in booksData.index:

        if authorsData["Name"][autIndex] in booksData["authors"][bookIndex]:
            authorsData["BookConnections"][autIndex].append(bookIndex)
            booksData["AuthorConnections"][bookIndex].append(autIndex)

            publisher = str(booksData["publisher"][bookIndex])

            for pubIndex in publishersData.index:
                if publisher.find(str(publishersData["name"][pubIndex])) != -1:

                    if not (
                        compList(
                            list(publishersData["AuthorConnections"][pubIndex]),
                            autIndex,
                        )
                    ):
                        publishersData["AuthorConnections"][pubIndex].append(autIndex)

                    if not (
                        compList(
                            list(authorsData["PublisherConnections"][autIndex]),
                            pubIndex,
                        )
                    ):
                        authorsData["PublisherConnections"][autIndex].append(pubIndex)

                    if not (
                        compList(
                            list(booksData["PublisherConnections"][bookIndex]), pubIndex
                        )
                    ):
                        booksData["PublisherConnections"][bookIndex].append(pubIndex)

                    if not (
                        compList(
                            list(publishersData["BookConnections"][pubIndex]), bookIndex
                        )
                    ):
                        publishersData["BookConnections"][pubIndex].append(bookIndex)


def listToString(x):
    string = ""
    counter = 0
    for num in x:
        if counter == 0:
            string += str(num)
        else:
            string += "," + str(num)
        counter += 1
    return string


for aInx in authorsData.index:
    authorsData["PublisherConnections"][aInx] = listToString(
        authorsData["PublisherConnections"][aInx]
    )
    authorsData["BookConnections"][aInx] = listToString(
        authorsData["BookConnections"][aInx]
    )

for aInx in booksData.index:
    booksData["PublisherConnections"][aInx] = listToString(
        booksData["PublisherConnections"][aInx]
    )
    booksData["AuthorConnections"][aInx] = listToString(
        booksData["AuthorConnections"][aInx]
    )

for aInx in publishersData.index:
    publishersData["BookConnections"][aInx] = listToString(
        publishersData["BookConnections"][aInx]
    )
    publishersData["AuthorConnections"][aInx] = listToString(
        publishersData["AuthorConnections"][aInx]
    )


authorsData.to_csv("./authors/FINAL-a.csv", encoding="utf-8")
booksData.to_csv("./books/FINAL-b.csv", encoding="utf-8")
publishersData.to_csv("./publishers/FINAL-p.csv", encoding="utf-8")

print(counter)
