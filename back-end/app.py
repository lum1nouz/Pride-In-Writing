# inspiration from https://gitlab.com/caitlinlien/cs373-sustainability/-/blob/master/backend/main.py

from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from marshmallow import Schema, fields
from init import init_db
import flask_marshmallow as ma
from dotenv import load_dotenv
from models import *


class AuthorSchema(ma.Schema):
    author_id = fields.Int(required=True)
    author_name = fields.Str(required=False)
    author_tour = fields.Str(required=False)
    author_summary = fields.Str(required=False)
    author_image = fields.Str(required=False)
    year_born = fields.Str(required=False)
    nationality = fields.Str(required=False)
    genre = fields.Str(required=False)
    noteable_works = fields.Str(required=False)
    book_connections = fields.Str(required=False)
    publisher_connections = fields.Str(required=False)


class BookSchema(ma.Schema):
    book_id = fields.Int(required=True)
    name = fields.Str(required=False)
    genres = fields.Str(required=False)
    publisher = fields.Str(required=False)
    year = fields.Str(required=False)
    page_count = fields.Str(required=False)
    price = fields.Str(required=False)
    avg_rating = fields.Str(required=False)
    maturity_rating = fields.Str(required=False)
    description = fields.Str(required=False)
    image = fields.Str(required=False)
    authors = fields.Str(required=False)
    author_connections = fields.Str(required=False)
    publisher_connections = fields.Str(required=False)


class PublisherSchema(ma.Schema):
    publisher_id = fields.Int(required=True)
    name = fields.Str(required=False)
    image = fields.Str(required=False)
    origin = fields.Str(required=False)
    publication_types = fields.Str(required=False)
    founded = fields.Str(required=False)
    parent_comp = fields.Str(required=False)
    headquarters = fields.Str(required=False)
    website = fields.Str(required=False)
    author_connections = fields.Str(required=False)
    book_connections = fields.Str(required=False)


author_schema = AuthorSchema()
authors_schema = AuthorSchema(many=True)

book_schema = BookSchema()
books_schema = BookSchema(many=True)

publisher_schema = PublisherSchema()
publishers_schema = PublisherSchema(many=True)

@app.route("/")
def hello_world():
    return '<img src="https://i.kym-cdn.com/photos/images/original/001/211/814/a1c.jpg" alt="cowboy" />'

# __________ Authors __________

@app.route("/api/authors", methods=["GET"])
def getAuthors():
    all_authors = Author.query.all()
    result = authors_schema.dump(all_authors)
    return authors_schema.jsonify(result)


@app.route("/api/authors/id=<id>", methods=["GET"])
def get_country_id(id):
    author = Author.query.get(id)
    return author_schema.jsonify(author)

# Author Sorting
@app.route("/api/authors/sort=<order>&column=<column>", methods=["GET"])
def get_sorted_years(order, column):
    if order == "descending":
        sorted_authors = Author.query.order_by(getattr(Author, column).desc()).all()
    if order == "ascending":
        sorted_authors = Author.query.order_by(getattr(Author, column).asc()).all()
    result = author_schema.dump(sorted_authors)
    return jsonify({"sorted_authors": result})


# __________ Books __________

@app.route("/api/books", methods=["GET"])
def getBooks():
    all_books = Book.query.all()
    result = books_schema.dump(all_books)
    return books_schema.jsonify(result)


@app.route("/api/books/id=<id>", methods=["GET"])
def get_book_id(id):
    book = Book.query.get(id)
    return book_schema.jsonify(book)

# __________ Publishers __________

@app.route("/api/publishers", methods=["GET"])
def getPublishers():
    all_publishers = Publisher.query.all()
    result = publishers_schema.dump(all_publishers)
    return publishers_schema.jsonify(result)
    # return jsonify({"publishers": result})


@app.route("/api/publishers/id=<id>", methods=["GET"])
def get_publisher_id(id):
    publisher = Publisher.query.get(id)
    return publisher_schema.jsonify(publisher)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
