from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import create_engine, Column, String, Integer
import urllib
import json
import pandas as pd 

app = Flask(__name__)
app.debug = True
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Schema: "postgres+psycopg2://<USERNAME>:<PASSWORD>@<IP_ADDRESS>:<PORT>/<DATABASE_NAME>"
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql+psycopg2://lum1nouz:Granted123@pride-writing.caddomsge5cd.us-east-2.rds.amazonaws.com:5432/postgres'

db = SQLAlchemy(app)

# Define Author Table/Data model 
class Author(db.Model):
    author_id = db.Column(db.Integer, primary_key=True)
    author_name = db.Column(db.String())
    year_born = db.Column(db.String())
    nationality = db.Column(db.String())
    sexuality = db.Column(db.String())
    gender = db.Column(db.String())
    books_published = db.Column(db.Integer)

def __init__(self, author_id=0, author_name="NaN", year_born ="NaN", nationality="NaN", sexuality = "NaN", gender="NaN", books_published=0):
    self.author_id = author_id
    self.author_name = author_name
    self.year_born = year_born
    self.nationality = nationality
    self.sexuality = sexuality
    self.gender = gender
    self.books_published = books_published

db.create_all()

df = pd.read_csv(r'back-end\authors.csv')
author_list = []
for ind in df.index:
    id = ind
    name = df['Name'][ind]
    birth = df['Birthdate'][ind]
    nat = df['Nationality'][ind]
    sex = df['Sexuality'][ind]
    gen = df['Gender'][ind]
    published = df['Published'][ind]

    new_author = Author(author_id=id, author_name = name, year_born = birth, nationality = nat, sexuality = sex, gender = gen, books_published = published)
    author_list.append(new_author)

db.session.add_all(country_list)
db.session.commit()

