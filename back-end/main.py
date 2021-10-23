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

def __init__(self, book_id="NaN", book_name="NaN", book_author="NaN", book_genre="NaN", book_year_published=0, book_rating=0.0, book_pages=0, book_price=0.0):
    self.book_id = book_id
    self.book_name = book_name
    self.book_author = book_author
    self.book_genre = book_genre
    self.book_year_published = book_year_published
    self.book_rating = book_rating
    self.book_pages = book_pages
    self.book_price = book_price

db.create_all()
