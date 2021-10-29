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

    # Test the sixth instance of the author by id
    def test_authors_instance(self):
        r = requests.get("https://api.prideinwriting.me/api/authors/id=1")
        assert r.status_code == 200

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

    # Test the sixth instance of the books by id
    def test_books_instance(self):
        r = requests.get("https://api.prideinwriting.me/api/books/id=1")
        assert r.status_code == 200

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

    # Test the sixth instance of the publisher by id
    def test_publishers_instance(self):
        r = requests.get("https://api.prideinwriting.me/api/publishers/id=1")
        assert r.status_code == 200

    # Test the output when a not found publisher is queried
    def test_publishers_error(self):
        r = requests.get("https://api.prideinwriting.me/api/publishers/id=-1")
        d = r.json()
        assert d == {}


if __name__ == "__main__":
    main()
