from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
import sys
import json
# sys.path.append('./books/books.py')
# sys.path.append('./publishers/publishers.py') 
from authors import Author, AuthorSchema

app = Flask(__name__)
app.debug = True
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Schema: "postgres+psycopg2://<USERNAME>:<PASSWORD>@<IP_ADDRESS>:<PORT>/<DATABASE_NAME>"
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql+psycopg2://lum1nouz:Granted123@pride-writing.caddomsge5cd.us-east-2.rds.amazonaws.com:5432/postgres'


db = SQLAlchemy(app)

authorSchema = AuthorSchema()

@app.route("/")
def hello_world():
    return '<img src="https://i.kym-cdn.com/photos/images/original/001/211/814/a1c.jpg" alt="cowboy" />'

@app.route("/api/authors", methods=["GET"])
def getAuthors():
    authors = Author.query.all()

    return jsonify({"authors": authorSchema.dump(authors)})




with app.app_context():
    print(getAuthors())

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)