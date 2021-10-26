from flask_sqlalchemy import SQLAlchemy
db = SQLAlchemy()

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