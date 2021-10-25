from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import create_engine, Column, String, Integer
import urllib
import json


app = Flask(__name__)
app.debug = True
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Schema: "postgres+psycopg2://<USERNAME>:<PASSWORD>@<IP_ADDRESS>:<PORT>/<DATABASE_NAME>"
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql+psycopg2://lum1nouz:Granted123@pride-writing.caddomsge5cd.us-east-2.rds.amazonaws.com:5432/postgres'

db = SQLAlchemy(app)

# Define Book Table/Data model 
class Book(db.Model):
    book_id = db.Column(db.Integer, primary_key=True)
    book_name = db.Column(db.String())
    book_author = db.Column(db.String())
    book_genre = db.Column(db.String())
    book_year_published = db.Column(db.Integer)
    book_rating = db.Column(db.Float)
    book_pages = db.Column(db.Integer)
    book_price = db.Column(db.Float)

# Define Author Table/Data model 
class Author(db.Model):
    author_id = db.Column(db.Integer, primary_key=True)
    author_name = db.Column(db.String())
    year_born = db.Column(db.String())
    nationality = db.Column(db.String())
    sexuality = db.Column(db.String())
    gender = db.Column(db.String())
    books_published = db.Column(db.Integer)

# Define Publisher Table/Data model 
class Publisher(db.Model):
    publisher_id = db.Column(db.Integer, primary_key=True)
    publisher_name = db.Column(db.String())
    publisher_country= db.Column(db.String())
    publisher_type = db.Column(db.String())
    publisher_authors = db.Column(db.String())
    publisher_founded = db.Column(db.Integer)


def __init__(self, nan="NaN", def_int=0, def_float=0.0):
    self.book_id = nan
    self.book_name = nan
    self.book_author = nan
    self.book_genre = nan
    self.book_year_published = def_int
    self.book_rating = def_float
    self.book_pages = def_int
    self.book_price = def_float

    self.author_id = db.Column(db.Integer, primary_key=True)
    self.author_name = db.Column(db.String())
    self.year_born = db.Column(db.String())
    self.nationality = db.Column(db.String())
    self.sexuality = db.Column(db.String())
    self.gender = db.Column(db.String())
    self.books_published = db.Column(db.Integer)

    self.publisher_id = nan
    self.publisher_name = nan
    self.publisher_country= nan
    self.publisher_type = nan
    self.publisher_authors = nan
    self.publisher_founded = def_int

db.create_all()
