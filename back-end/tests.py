from unittest import main, TestCase
import requests
import json


class Tests(TestCase):

    #################
    # AUTHORS TESTS #
    #################

    # Test the total number of authors
    def test_authors_total(self):
        r = requests.get("https://api.prideinwriting.me/api/authors")
        assert r.status_code == 200
        d = r.json()
        assert len(d) == 119

    # Test the first instance of the authors list
    def test_authors_first(self):
        r = requests.get("https://api.prideinwriting.me/api/authors")
        assert r.status_code == 200
        d = r.json()
        assert len(d) > 0
        assert d[0]== {
            "author_id": 0,
            "author_image": "https://api.penguinrandomhouse.com/title/client/Public/domains/PRH.US/authors/231",
            "author_name": "Will Aitken",
            "author_summary": "Will Aitken is an American-Canadian novelist, journalist and film critic.[1][2] Originally from Te...aute, Indiana, he has been based in Montreal, Quebec since moving to that city to attend McGill University in 1972.\n",
            "author_tour": "false",
            "book_connections": "NaN",
            "genre": "novelist, film critic",
            "nationality": "American-Canadian",
            "noteable_works": "Terre Haute, Realia",
            "publisher_connections": "NaN",
            "year_born": "None",
        }

    # Test the sixth instance of the author by id
    def test_authors_instance(self):
        r = requests.get("https://api.prideinwriting.me/api/authors/id=1")
        assert r.status_code == 200
        d = r.json()
        assert d == {
            "author_id": 6,
            "author_image": "https://api.penguinrandomhouse.com/title/client/Public/domains/PRH.US/authors/2174705",
            "author_name": "Dorothy Allison",
            "author_summary": "Dorothy Allison (born April 11, 1949) is an American writer from South Carolina whose writing focu...everal Lambda Literary Awards. In 2014, Allison was elected to membership in the Fellowship of Southern Writers.[3]\n",
            "author_tour": "false",
            "book_connections": "0,1",
            "genre": "novelist",
            "nationality": "American",
            "noteable_works": "Bastard Out of Carolina",
            "publisher_connections": "NaN",
            "year_born": "1949",
        }

    # Test the output when a not found author is queried
    def test_authors_error(self):
        r = requests.get("https://api.prideinwriting.me/api/authors/id=-1")
        assert r.status_code == 200
        d = r.json()
        assert d == {}

    ###############
    # BOOKS TESTS #
    ###############

    # Test the total number of books
    def test_books_total(self):
        r = requests.get("https://api.prideinwriting.me/api/books")
        assert r.status_code == 200
        d = r.json()
        assert len(d) == 445

    # Test the first instance of the books list
    def test_books_first(self):
        r = requests.get("https://api.prideinwriting.me/api/books")
        assert r.status_code == 200
        d = r.json()
        assert len(d[0]) > 0
        assert d[0] == {
            "author_connections": "1",
            "authors": "['Dorothy Allison']",
            "avg_rating": "4.0",
            "book_id": 0,
            "description": "A profound portrait of family dynamics in the rural South and \u201can essential novel\u201d (The New Yorker) \u201cAs close to flawless as any reader could ask for . . . The living language [Allison] has created is as exact and innovative as the language of To Kill a Mockingbird and The Catcher in the Rye.\u201d \u2014The New York Times Book Review The publication of Dorothy Allison\u2019s Bastard Out of Carolina was a landmark event that won the author a National Book Award nomination and launched her into the literary spotlight. Critics have likened Allison to Harper Lee, naming her the first writer of her generation to dramatize the lives and language of poor whites in the South. Since its appearance, the novel has inspired an award-winning film and has been banned from libraries and classrooms, championed by fans, and defended by critics. Greenville County, South Carolina, is a wild, lush place that is home to the Boatwright family\u2014a tight-knit clan of rough-hewn, hard-drinking men who shoot up each other\u2019s trucks, and indomitable women who get married young and age too quickly. At the heart of this story is Ruth Anne Boatwright, known simply as Bone, a bastard child who observes the world around her with a mercilessly keen perspective. When her stepfather Daddy Glen, \u201ccold as death, mean as a snake,\u201d becomes increasingly more vicious toward her, Bone finds herself caught in a family triangle that tests the loyalty of her mother, Anney\u2014and leads to a final, harrowing encounter from which there can be no turning back.",
            "genres": "['Fiction']",
            "image": "http://books.google.com/books/content?id=vP-O7CeZET8C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
            "maturity_rating": "NOT_MATURE",
            "name": "Bastard Out of Carolina",
            "page_count": "336.0",
            "price": "9.99",
            "publisher": "Penguin",
            "publisher_connections": "nan",
            "year": "2005-09-06",
        }

    # Test the sixth instance of the books by id
    def test_books_instance(self):
        r = requests.get("https://api.prideinwriting.me/api/books/id=1")
        assert r.status_code == 200
        d = r.json()
        assert d == {
            "author_connections": "1",
            "authors": "['Dorothy Allison']",
            "avg_rating": "4.0",
            "book_id": 1,
            "description": "Bastard Out of Carolina, nominated for the 1992 National Book Award for fiction, introduced Dorothy A... steeped in the hard-won wisdom of experience, expresses the strength of her unique vision with beauty and eloquence.",
            "genres": "['Biography & Autobiography']",
            "image": "http://books.google.com/books/content?id=xGDfLNLBHGcC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
            "maturity_rating": "NOT_MATURE",
            "name": "Two or Three Things I Know for Sure",
            "page_count": "112.0",
            "price": "11.99",
            "publisher": "Penguin",
            "publisher_connections": "nan",
            "year": "1996-08-01",
        }

    # Test the output when a not found book is queried
    def test_books_error(self):
        r = requests.get("https://api.prideinwriting.me/api/books/id=-1")
        assert r.status_code == 200
        d = r.json()
        assert d == {}

    ###################
    # PUBLISHER TESTS #
    ###################

    # Test the total number of publishers
    def test_publishers_total(self):
        r = requests.get("https://api.prideinwriting.me/api/publishers")
        assert r.status_code == 200
        d = r.json()
        assert len(d) == 463

    # Test the first instance of the publishers list
    def test_publishers_first(self):
        r = requests.get("https://api.prideinwriting.me/api/publishers")
        assert r.status_code == 200
        d = r.json()
        assert len(d[0]) > 0
        assert d[0] == {
            "author_connections": "nan",
            "book_connections": "nan",
            "founded": "1988",
            "headquarters": "Minneapolis",
            "image": "https://upload.wikimedia.org/wikipedia/en/thumb/f/fb/Augsburg_Fortress_logo.png/200px-Augsburg_Fortress_logo.png",
            "name": "1517 Media",
            "origin": "United States",
            "parent_comp": "Evangelical Lutheran Church in America",
            "publication_types": "Books",
            "publisher_id": 0,
            "website": "www.1517.media",
        }

    # Test the sixth instance of the publisher by id
    def test_publishers_instance(self):
        r = requests.get("https://api.prideinwriting.me/api/publishers/id=1")
        assert r.status_code == 200
        d = r.json()
        assert d == {
            "author_connections": "nan",
            "book_connections": "nan",
            "founded": "Unknown",
            "headquarters": "Unknown",
            "image": "https://upload.wikimedia.org/wikipedia/en/thumb/a/ad/ELCA_Brandmark_Stacked.png/200px-ELCA_Brandmark_Stacked.png",
            "name": "Evangelical Lutheran Church in America",
            "origin": "Unknown",
            "parent_comp": "Unkown",
            "publication_types": "Unknown",
            "publisher_id": 1,
            "website": "www.elca.org",
        }

    # Test the output when a not found publisher is queried
    def test_publishers_error(self):
        r = requests.get("https://api.prideinwriting.me/api/publishers/id=-1")
        d = r.json()
        assert d == {}


if __name__ == "__main__":
    main()
