# inspiration from https://gitlab.com/caitlinlien/cs373-sustainability/-/blob/master/backend/main.py

from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from marshmallow import Schema, fields
import flask_marshmallow as ma
from dotenv import load_dotenv
from models import *

app = Flask(__name__)
load_dotenv()
app.debug = True
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Schema: "postgres+psycopg2://<USERNAME>:<PASSWORD>@<IP_ADDRESS>:<PORT>/<DATABASE_NAME>"
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql+psycopg2://lum1nouz:Granted123@pride-writing.caddomsge5cd.us-east-2.rds.amazonaws.com:5432/postgres'
ma = Marshmallow(app) 

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

author_schema = AuthorSchema()
authors_schema = AuthorSchema(many=True)

book_schema = BookSchema()
books_schema = BookSchema(many=True)

@app.route("/")
def hello_world():
    return '<img src="https://i.kym-cdn.com/photos/images/original/001/211/814/a1c.jpg" alt="cowboy" />'

@app.route("/api/authors", methods=["GET"])
def getAuthors():
    all_authors = Author.query.all()
    result = authors_schema.dump(all_authors)
    return jsonify({"authors": result})

@app.route("/api/books", methods=["GET"])
def getBooks():
    all_books = Book.query.all()
    result = books_schema.dump(all_books)
    return jsonify({"books": result})

if __name__ == "__main__":
    db.init_app(app)
    app.run(host="0.0.0.0", port=5000, debug=True)