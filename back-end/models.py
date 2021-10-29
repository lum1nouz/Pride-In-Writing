from flask_sqlalchemy import SQLAlchemy 
from init import init_db
from flask import Flask
import flask_marshmallow as ma
from flask_marshmallow import Marshmallow

app = Flask(__name__)
db = init_db(app)
ma = Marshmallow(app) 

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
    book_connections = db.Column(db.String())
    publisher_connections = db.Column(db.String())
    # book_connections = db.Column(MutableList.as_mutable(PickleType), default=[])
    # publisher_connections = db.Column(MutableList.as_mutable(PickleType), default=[])

class Book(db.Model):
    book_id = db.Column(db.Integer(), primary_key=True)
    name = db.Column(db.String())
    genres = db.Column(db.String())
    publisher = db.Column(db.String())
    year = db.Column(db.String())
    page_count = db.Column(db.String())
    price = db.Column(db.String())
    avg_rating = db.Column(db.String())
    maturity_rating = db.Column(db.String())
    description = db.Column(db.String())
    image = db.Column(db.String())
    authors = db.Column(db.String())
    author_connections = db.Column(db.String())
    publisher_connections = db.Column(db.String())

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