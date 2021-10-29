#Code inspired from https://gitlab.com/cs373-group14/books4u/-/blob/master/backend/scrape.py
#Books for you

from flask import Flask, render_template, request, jsonify
#from flask_cors import CORS
import requests
import pandas as pd
import time
import urllib
import os
import json

def createBooksCsv():
    authorsDataFrames = pd.read_csv('../authors/authors-prefinaldata.csv')
    
    def scrapeBooksByAuthor(name):
        book_params = {
            "q" : '+inauthor:' + name,
            "maxResults" : "40",
            "key" : "AIzaSyBfDnDyQXOPHdN2bVSgqy-NV_CCZJCbnj0"
            
        }
        
        raw = requests.get(
            "https://www.googleapis.com/books/v1/volumes", params=book_params
        ).json()
        return raw
        
    books_list = []
    for i in range(len(authorsDataFrames)):
        author_name = authorsDataFrames['Name'][i]
        print(i, author_name)
        result = scrapeBooksByAuthor(author_name)
        try:
            result = result['items']
            for book in result:
                curr = {}
                try:
                    curr['name'] = book['volumeInfo']['title']
                except:
                    curr['name'] = None
                try:
                    curr['genres'] = book['volumeInfo']['categories']
                except:
                    curr['genres'] = None
                try:
                    curr['publisher'] = book['volumeInfo']['publisher']
                except:
                    curr['publisher'] = None
                try:
                    curr['year'] = book['volumeInfo']['publishedDate']
                except:
                    curr['year'] = None
                try:
                    curr['page_count'] = book['volumeInfo']['pageCount']
                except:
                    curr['page_count'] = None
                try:
                    curr['purchase_link'] = book['saleInfo']['buyLink']
                    curr['price'] = book['saleInfo']['listPrice']['amount']
                except:
                    curr['purchase_link'] = None
                    curr['price'] = None
                try:
                    curr['avg_rating'] = book['volumeInfo']['averageRating']
                except:
                    curr['avg_rating'] = None
                try:
                    curr['num_ratings'] = book['volumeInfo']['ratingsCount']
                except:
                    curr['num_ratings'] = None
                try:
                    curr['maturity_rating'] = book['volumeInfo']['maturityRating']
                except:
                    curr['maturity_rating'] = None
                try:
                    curr['language'] = book['volumeInfo']['language']
                except:
                    curr['language'] = None
                try:
                    curr['description'] = book['volumeInfo']['description']
                except:
                    curr['description'] = None
                try:
                    curr['image'] = book['volumeInfo']['imageLinks']['thumbnail']
                except:
                    curr['image'] = None
                try:
                    authors_list = book['volumeInfo']['authors']
                    # Check if current author has written current book
                    if author_name in authors_list:
                        curr['authors'] = book['volumeInfo']['authors']
                    else:
                        raise Exception("Author must match")
                except:
                    # Avoid adding current book if not written by current author
                    continue
                books_list.append(curr)
        except:
            continue
    booksDataFrames = pd.DataFrame.from_dict(books_list)
    booksDataFrames.to_csv('books-prefinaldata.csv', encoding = 'utf-8')


if __name__ == "__main__":
    createBooksCsv()