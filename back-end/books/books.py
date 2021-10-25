from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import create_engine, Column, String, Integer, PickleType
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




# Define Book Table/Data model 
class Book(db.Model):
    book_id = db.Column(db.Integer(), primary_key=True)
    name = db.Column(db.String())
    genres = db.Column(db.String())
    publisher = db.Column(db.String())
    year = db.Column(db.String())
    page_count = db.Column(db.String())
    price = db.Column(db.String())
    avg_rating = db.Column(db.String())
    maturity_rating=db.Column(db.String())
    description=db.Column(db.String())
    image = db.Column(db.String())
    authors = db.Column(db.String())
    author_connections = db.Column(db.String())
    publisher_connections = db.Column(db.String())


def __init__(self):
    self.book_id = 0
    self.name = "NaN"
    self.genres = "NaN"
    self.publisher = "NaN"
    self.year = "NaN"
    self.page_count = "NaN"
    self.price = "NaN"
    self.avg_rating = "NaN"
    self.maturity_rating= "NaN"
    self.description= "NaN"
    self.image = "NaN"
    self.authors = "NaN"
    self.author_connections = "NaN"
    self.publisher_connections = "NaN"

db.create_all()


# ,id,name,genres,publisher,year,page_count,purchase_link,price,avg_rating,num_ratings,maturity_rating,language,description,image,authors,AuthorConnections,PublisherConnections
df = pd.read_csv(r'./books-finaldata.csv')
print(df)
book_list = []
for ind in df.index:
    Id = int(df['id'][ind])
    Name = str(df['name'][ind])
    Genres =str(df['genres'][ind])
    Publisher = str(df['publisher'][ind])
    Year = str(df['year'][ind])
    PageCount = str(df['page_count'][ind])
    Price = str(df['price'][ind])
    AvgRating= str(df['avg_rating'][ind])
    MaturityRating = str(df['maturity_rating'][ind])
    Description = str(df['description'][ind])
    Image = str(df['image'][ind])
    Authors = str(df['authors'][ind])
    AuthorConnections = str(df['AuthorConnections'][ind])
    PublicherConnections = str(df['PublisherConnections'][ind])

    new_book = Book(book_id = Id, name = Name, genres = Genres, publisher = Publisher, year = Year, page_count= PageCount, price = Price, avg_rating = AvgRating, maturity_rating = MaturityRating, description = Description, image = Image, authors = Authors, author_connections = AuthorConnections, publisher_connections = PublicherConnections)
    book_list.append(new_book)

db.session.add_all(book_list)
db.session.commit()