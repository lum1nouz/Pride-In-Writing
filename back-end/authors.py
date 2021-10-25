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
    author_id = db.Column(db.Integer(), primary_key=True)
    author_name = db.Column(db.String())
    author_tour = db.Column(db.String())
    author_summary = db.Column(db.String())
    author_image = db.Column(db.String())
    year_born = db.Column(db.String())
    nationality = db.Column(db.String())
    genre = db.Column(db.String())
    noteable_works = db.Column(db.String())

def __init__(self, author_id=0, author_name="NaN", author_tour="NaN", author_summary="NaN", author_image="NaN", year_born ="NaN", nationality="NaN", noteable_works="NaN", genre = "NaN"):
    self.author_id = author_id
    self.author_name = author_name
    self.author_tour = author_tour
    self.author_summary = author_summary
    self.author_image = author_image
    self.year_born = year_born
    self.nationality = nationality
    self.genre = genre
    self.noteable_works = noteable_works

db.create_all()

df = pd.read_csv(r'./authors-finaldata.csv')
df = df.drop("Ind", axis=1)
print(df)
author_list = []
for ind in df.index:
    id = int(ind)
    name = str(df['Name'][ind])
    if(bool(df['OnTour'][ind])):
        tour = "True"
    else: 
        tour = "False"
    sum = str(df['Summary'][ind])
    image = str(df['Link'][ind])
    birth = str(df['Lifetime'][ind])
    nat = str(df['Nationality'][ind])
    gen = str(df['Genre'][ind])
    note = str(df['Notable Works'][ind])
    author_tour = str(tour)

    new_author = Author(author_id=id, author_name = name, author_tour = str(tour), author_summary = sum, author_image = image, year_born = birth, nationality = nat, genre = gen, noteable_works = note)
    author_list.append(new_author)

db.session.add_all(author_list)
db.session.commit()