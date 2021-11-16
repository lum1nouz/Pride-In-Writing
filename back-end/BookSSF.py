from models import *
from sqlalchemy import and_, or_, func

# Code based on https://gitlab.com/forbesye/fitsbits/-/blob/master/back-end/Politician.py
def search_books(search, all_books):
    if not search:
        return all_books

    terms = search.split()
    terms = [w.lower() for w in terms]

    searches = []
    for term in terms:
        # Book Name
        searches.append(Book.name.ilike("%{}%".format(term)))
        # Book Genres
        searches.append(Book.genres.match(term))
        # Book Publisher
        searches.append(Book.publisher.match(term))
        # Book Year Written
        searches.append(Book.year.match(term))
        # Book Price
        searches.append(Book.price.match(term))
        # Book Authors
        searches.append(Book.authors.match(term))

    all_books = all_books.filter(or_(*tuple(searches)))

    return all_books
