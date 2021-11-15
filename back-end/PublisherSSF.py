from models import *
from sqlalchemy import and_, or_, func

# Applies filter with an "or" on each attribute
# District number and counties have to be an exact match
# search all_authors
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
        searches.append(Publisher.origin.match(term))
        # Publisher Publication Types
        searches.append(Publisher.publication_types.match(term))
        # Publisher Founded
        searches.append(Publisher.founded.match(term))
        # Publisher Parent Company
        searches.append(Publisher.parent_comp.match(term))
        # Publisher HQ
        searches.append(Publisher.headquarters.match(term))
        # Publisher Website
        searches.append(Publisher.website.match(term))

    all_publishers = all_publishers.filter(or_(*tuple(searches)))

    return all_publishers
