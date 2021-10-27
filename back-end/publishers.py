from os import name
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import create_engine, Column, String, Integer, PickleType
from sqlalchemy.ext.mutable import MutableList

import urllib
import json
import pandas as pd 

app = Flask(__name__)
app.debug = True
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Schema: "postgres+psycopg2://<USERNAME>:<PASSWORD>@<IP_ADDRESS>:<PORT>/<DATABASE_NAME>"
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql+psycopg2://lum1nouz:Granted123@pride-writing.caddomsge5cd.us-east-2.rds.amazonaws.com:5432/postgres'

db = SQLAlchemy(app)

# ,name,image,origin,publication_types,founded,parent_comp,hq,website,AuthorConnections,BookConnections,id


# Define Publisher Table/Data model 
class Publisher(db.Model):
    publisher_id = db.Column(db.Integer(), primary_key=True)
    name = db.Column(db.String())
    image = db.Column(db.String())
    origin = db.Column(db.String())
    publication_types = db.Column(db.String())
    founded = db.Column(db.String())
    parent_comp = db.Column(db.String())
    headquarters = db.Column(db.String())
    website = db.Column(db.String())
    author_connections = db.Column(db.String())
    book_connections = db.Column(db.String())


def __init__(self):
    self.publisher_id = 0
    self.name = "NaN"
    self.image = "NaN"
    self.origin = "NaN"
    self.publication_types = "NaN"
    self.founded = "NaN"
    self.parent_comp = "NaN"
    self.headquarters = "NaN"
    self.website = "NaN"
    self.author_connections = "NaN"
    self.book_connections = "NaN"

db.create_all()


# ,name,image,origin,publication_types,founded,parent_comp,hq,website,AuthorConnections,BookConnections,id
df = pd.read_csv(r'./publishers/publishers-finaldata.csv')
print(df)
publisher_list = []
for ind in df.index:
    Id = int(df['id'][ind])
    Name =str(df['name'][ind])
    Image =str(df['image'][ind])
    Origin = str(df['origin'][ind])
    PublicationTypes = str(df['publication_types'][ind])
    Founded = str(df['founded'][ind])
    ParentComp = str(df['parent_comp'][ind])
    Headquarters = str(df['hq'][ind])
    Website = str(df['website'][ind])
    AuthorConenctions = str(df['AuthorConnections'][ind])
    BookConnections = str(df['BookConnections'][ind])

    new_publisher = Publisher(publisher_id = Id, name = Name, image =Image, origin = Origin, publication_types = PublicationTypes, founded = Founded, parent_comp = ParentComp, headquarters = Headquarters, website =Website, author_connections = AuthorConenctions, book_connections = BookConnections)
    publisher_list.append(new_publisher)

db.session.add_all(publisher_list)
db.session.commit()

