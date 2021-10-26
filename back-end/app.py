from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
import sys
import json
# sys.path.append('./books/books.py')
# sys.path.append('./publishers/publishers.py') 
from authors import Author, AuthorSchema
from models import *
from dotenv import load_dotenv
from flask_marshmallow import Marshmallow
from marshmallow import Schema, fields
import flask_marshmallow as ma

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

    # country_id = fields.Int(required=True)
    # country_name = fields.Str(required=False)
    # country_region = fields.Str(required=False)
    # income_level = fields.Str(required=False)
    # country_iso2code = fields.Str(required=False)
    # country_iso3code = fields.Str(required=False)
    # country_population = fields.Int(required=False)
    # lat = fields.Int(required=False)
    # long = fields.Int(required=False)
    # highest_emission = fields.Float(required=False)
    # recent_emissions = fields.Float(required=False)
    # capital_city_id = fields.Int(required=False)
    # country_capital_city = fields.Str(required=False)
    # high_year = fields.Int(required=False)

author_schema = AuthorSchema()
authors_schema = AuthorSchema(many=True)

@app.route("/")
def hello_world():
    return '<img src="https://i.kym-cdn.com/photos/images/original/001/211/814/a1c.jpg" alt="cowboy" />'

@app.route("/api/authors", methods=["GET"])
def getAuthors():
    all_authors = Author.query.all()
    result = authors_schema.dump(all_authors)
    return jsonify({"authors": result})




# with app.app_context():
#     print(getAuthors())

if __name__ == "__main__":
    db.init_app(app)
    app.run(host="0.0.0.0", port=5000, debug=True)