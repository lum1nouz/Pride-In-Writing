from models import *
from sqlalchemy import and_, or_, func

# Code based on https://gitlab.com/forbesye/fitsbits/-/blob/master/back-end/Politician.py
def search_publishers(search, all_publishers):
    if not search:
        return all_publishers

    terms = search.split()
    terms = [w.lower() for w in terms]

    searches = []
    for term in terms:
        # Publisher Name
        searches.append(Publisher.name.ilike("%{}%".format(term)))
        # Publisher Origin
        searches.append(Publisher.origin.contains(term))
        # Publisher Publication Types
        searches.append(Publisher.publication_types.contains(term))
        # Publisher Founded
        searches.append(Publisher.founded.contains(term))
        # Publisher Parent Company
        searches.append(Publisher.parent_comp.contains(term))
        # Publisher HQ
        searches.append(Publisher.headquarters.contains(term))
        # Publisher Website
        searches.append(Publisher.website.contains(term))

    all_publishers = all_publishers.filter(or_(*tuple(searches)))

    return all_publishers
