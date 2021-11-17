from models import *
from sqlalchemy import and_, or_, func

# Code based on https://gitlab.com/forbesye/fitsbits/-/blob/master/back-end/Politician.py
def search_authors(search, all_authors):
    if not search:
        return all_authors

    terms = search.split()
    terms = [w.lower() for w in terms]

    searches = []
    for term in terms:
        # Author Name
        searches.append(Author.author_name.ilike("%{}%".format(term)))
        # Author Genre
        searches.append(Author.genre.contains(term))
        # Author Nationality
        searches.append(Author.nationality.contains(term))
        # Author Notable Works
        searches.append(Author.noteable_works.contains(term))
        # Author year born
        searches.append(Author.year_born.contains(term))

    all_authors = all_authors.filter(or_(*tuple(searches)))

    return all_authors
