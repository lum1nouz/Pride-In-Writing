from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import create_engine, Column, String, Integer, PickleType
from marshmallow_sqlalchemy import SQLAlchemyAutoSchema
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
    book_connections = db.Column(db.String())
    publisher_connections = db.Column(db.String())
    # book_connections = db.Column(MutableList.as_mutable(PickleType), default=[])
    # publisher_connections = db.Column(MutableList.as_mutable(PickleType), default=[])

def __init__(self, author_id=0, author_name="NaN", author_tour="NaN", author_summary="NaN", author_image="NaN", year_born ="NaN", nationality="NaN", noteable_works="NaN", genre = "NaN", book_connections = [], publisher_connections = []):
    self.author_id = author_id
    self.author_name = author_name
    self.author_tour = author_tour
    self.author_summary = author_summary
    self.author_image = author_image
    self.year_born = year_born
    self.nationality = nationality
    self.genre = genre
    self.noteable_works = noteable_works
    self.book_connections = book_connections
    self.publisher_connections = publisher_connections

# ,Name,Year Born,Nationality,Genre,Notable Works,OnTour,Link,Summary,id,BookConnections,PublisherConnections
def createTable():
    db.create_all()
    df = pd.read_csv(r'./authors/authors-finaldata.csv')
    print(df)
    author_list = []
    for ind in df.index:
        id = int(df['id'][ind])
        name = str(df['Name'][ind])
        yearBorn = str(df['Year Born'][ind])
        nat = str(df['Nationality'][ind])
        gen = str(df['Genre'][ind])
        note = str(df['Notable Works'][ind])
        authorTour = bool(df['OnTour'][ind])
        image = str(df['Link'][ind])
        sum = str(df['Summary'][ind])
        bookCon = df['BookConnections'][ind]
        pubCon = df['PublisherConnections'][ind]

        new_author = Author(author_id=id, author_name = name, author_tour = authorTour, author_summary = sum, author_image = image, year_born = yearBorn, nationality = nat, genre = gen, noteable_works = note, book_connections = bookCon, publisher_connections = pubCon)
        author_list.append(new_author)

    db.session.add_all(author_list)
    db.session.commit()

class AuthorSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Author

# with app.app_context():
#     createTable()
