from flask import Flask, render_template, request, jsonify

# from flask_cors import CORS
import requests
import time
import urllib
import os
import json


import numpy as np
import pandas as pd

pubFinalData = pd.read_csv(r"./publishers-prefinaldata.csv")
bioData = pd.read_csv(r"./publisherbio.csv")
ukData = pd.read_csv(r"./publishersUK.csv")

pub_list = []
for i in pubFinalData.index:
    pub_name = str(pubFinalData["name"][i])
    pub_list.append(
        {
            "name": pubFinalData["name"][i],
            "image": pubFinalData["image"][i],
            "origin": pubFinalData["origin"][i],
            "publication_types": pubFinalData["publication_types"][i],
            "founded": pubFinalData["founded"][i],
            "parent_comp": pubFinalData["parent_comp"][i],
            "hq": pubFinalData["hq"][i],
            "website": pubFinalData["website"][i],
        }
    )

for i in ukData.index:
    pub_name = str(ukData["name"][i])
    pub_list.append(
        {
            "name": ukData["name"][i],
            "image": ukData["image"][i],
            "origin": ukData["origin"][i],
            "publication_types": pubFinalData["publication_types"][i],
            "founded": ukData["founded"][i],
            "parent_comp": ukData["parent_comp"][i],
            "hq": ukData["hq"][i],
            "website": ukData["website"][i],
        }
    )

pubData = pd.DataFrame.from_dict(pub_list)

pubData.to_csv("publishers-stage1data.csv", encoding="utf-8")

pubFinalData = pd.read_csv(r"./publishers-prefinaldata.csv")

pub_list = []
for i in pubFinalData.index:
    publisher_name = str(pubFinalData["name"][i])
    found = False
    for j in bioData.index:
        if str(bioData["name"][j]).find(publisher_name) != -1:
            pub_list.append(
                {
                    "name": pubFinalData["name"][i],
                    "summary": bioData["bio"][i],
                    "image": pubFinalData["image"][i],
                    "origin": pubFinalData["origin"][i],
                    "publication_types": pubFinalData["publication_types"][i],
                    "founded": pubFinalData["founded"][i],
                    "parent_comp": pubFinalData["parent_comp"][i],
                    "hq": pubFinalData["hq"][i],
                    "website": pubFinalData["website"][i],
                }
            )
            found = True
    if not found:
        pub_list.append(
            {
                "name": pubFinalData["name"][i],
                "summary": "",
                "image": pubFinalData["image"][i],
                "origin": pubFinalData["origin"][i],
                "publication_types": pubFinalData["publication_types"][i],
                "founded": pubFinalData["founded"][i],
                "parent_comp": pubFinalData["parent_comp"][i],
                "hq": pubFinalData["hq"][i],
                "website": pubFinalData["website"][i],
            }
        )

imageAut = pd.DataFrame.from_dict(pub_list)

imageAut.drop_duplicates(subset="name", keep=False, inplace=True)

imageAut.to_csv("publishers-stage2data.csv", encoding="utf-8")
