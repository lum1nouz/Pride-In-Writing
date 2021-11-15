from models import *
from sqlalchemy import and_, or_, func

# Applies filter with an "or" on each attribute
# District number and counties have to be an exact match
# search all_authors
def search_authors(search, all_authors):
    if not search:
        return all_authors

    terms = search.split()
    terms = [w.lower() for w in terms]

    # if "zodiac" in terms:
    #     return all_authors.filter(
    #         and_(Politician.name.match("Cruz"), Politician.name.match("Ted"))
    #     )
    searches = []
    for term in terms:
        # searches.append(Politician.office.match(term))
        # try:
        #     searches.append(Politician.district_number.in_([int(term)]))
        # except ValueError:
        #     pass
        # searches.append(
        #     Politician.current_district.has(
        #         District.counties.any(func.lower(Counties.name).contains(term.lower()))
        #     )
        # )
        # searches.append(Politician.elections.any(Election.election_day.contains(term)))

        # Author Name
        searches.append(Author.author_name.ilike("%{}%".format(term)))
        # Author Genre
        searches.append(Author.genre.match(term))
        # Author Nationality
        searches.append(Author.nationality.match(term))
        # Author Notable Works
        searches.append(Author.noteable_works.match(term))
        # Author year born
        searches.append(Author.year_born.match(term))

    all_authors = all_authors.filter(or_(*tuple(searches)))

    return all_authors
