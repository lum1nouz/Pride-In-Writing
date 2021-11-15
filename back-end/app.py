# inspiration from https://gitlab.com/caitlinlien/cs373-sustainability/-/blob/master/backend/main.py

from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from marshmallow import Schema, fields
from init import init_db
import flask_marshmallow as ma
from dotenv import load_dotenv
from models import *
from AuthorSSF import *


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

def stringToSet(string):
    a_list = string.split(",")
    map_object = map(int, a_list)
    return set(map_object)

@app.route("/")
def hello_world():
    return '<img src="https://i.kym-cdn.com/photos/images/original/001/211/814/a1c.jpg" alt="cowboy" />'

# __________ Authors __________

@app.route("/api/authors", methods=["GET"])
def getAuthors():
    # all_authors = Author.query.all()
    all_authors = db.session.query(Author)

    # Query Params
    sort_by = request.args.get('sort_by')
    order = request.args.get('direction')
    search = request.args.get('search')

    nationality = request.args.get('nationality')
    genre = request.args.get('genre')
    year_born = request.args.get('year_born')

    # # Filter 
    if nationality is not None:
        all_authors = all_authors.filter(Author.nationality == nationality)
    if genre is not None:
        genre = genre.lower()
        all_authors = all_authors.filter(Author.genre == genre)
    if year_born is not None:
        all_authors = all_authors.filter(Author.year_born == year_born)

    # # Sort
    if sort_by is not None and order is not None:
        sort_by = sort_by.lower()
        order = order.lower()
        if order == 'ascend':
            all_authors = all_authors.order_by(getattr(Author, sort_by).asc())
        else:
            all_authors = all_authors.order_by(getattr(Author, sort_by).desc())

    if search is not None:
        search = search.lower()
        all_authors = search_authors(search, all_authors)

    result = authors_schema.dump(all_authors)
    return authors_schema.jsonify(result)

@app.route("/api/authors/id=<id>", methods=["GET"])
def get_author_id(id):
    author = Author.query.get(id)
    return author_schema.jsonify(author)

@app.route("/api/authors/ids=<ids>", methods=["GET"])
def get_author_ids(ids):
    idList = stringToSet(ids)
    for x in idList:
        print(x)
    authors = Author.query.filter(Author.author_id.in_(idList)).all()
    result = authors_schema.dump(authors)
    return authors_schema.jsonify(result)

# __________ Books __________

@app.route("/api/books", methods=["GET"])
def getBooks():
    all_books = Book.query.all()

    # Query Params
    sort_by = request.args.get('sort_by').lower()
    order = request.args.get('direction').lower()

    # Sort
    if sort_by is not None:
        if order == 'ascend':
            all_books = all_books.order_by(getattr(Book, sort_by).asc())
        else:
            all_books = all_books.order_by(getattr(Book, sort_by).desc())

    result = books_schema.dump(all_books)
    return books_schema.jsonify(result)


@app.route("/api/books/id=<id>", methods=["GET"])
def get_book_id(id):
    book = Book.query.get(id)
    return book_schema.jsonify(book)

@app.route("/api/books/ids=<ids>", methods=["GET"])
def get_book_ids(ids):
    idList = stringToSet(ids)
    for x in idList:
        print(x)
    books = Book.query.filter(Book.book_id.in_(idList)).all()
    result = books_schema.dump(books)
    return books_schema.jsonify(result)

# __________ Publishers __________

@app.route("/api/publishers", methods=["GET"])
def getPublishers():
    all_publishers = Publisher.query.all()

    # Query Params
    sort_by = request.args.get('sort_by').lower()
    order = request.args.get('direction').lower()

    # Sort
    if sort_by is not None:
        if order == 'ascend':
            all_publishers = all_publishers.order_by(getattr(Publisher, sort_by).asc())
        else:
            all_publishers = all_publishers.order_by(getattr(Publisher, sort_by).desc())

    result = publishers_schema.dump(all_publishers)
    return publishers_schema.jsonify(result)

@app.route("/api/publishers/id=<id>", methods=["GET"])
def get_publisher_id(id):
    publisher = Publisher.query.get(id)
    return publisher_schema.jsonify(publisher)

@app.route("/api/publishers/ids=<ids>", methods=["GET"])
def get_publisher_ids(ids):
    idList = stringToSet(ids)
    for x in idList:
        print(x)
    publisher = Publisher.query.filter(Publisher.publisher_id.in_(idList)).all()
    result = publishers_schema.dump(publisher)
    return publishers_schema.jsonify(result)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
