from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv
import os

def init_db(app):
    load_dotenv()
    app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql+psycopg2://lum1nouz:Granted123@pride-writing.caddomsge5cd.us-east-2.rds.amazonaws.com:5432/postgres"
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    return SQLAlchemy(app)