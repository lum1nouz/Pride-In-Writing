import HomePage from "./components/HomePage/HomePage";
import AboutUs from "./components/AboutUs/AboutUs";
import Books from "./components/Books/Books";
import Publishers from "./components/Publishers/Publishers";
import Authors from "./components/Authors/Authors";
import { Route } from "react-router-dom";
import AuthorsInstance from "./components/Authors/AuthorsInstance";
import Author from "./models/author-model";
import Book from "./models/book-model";
import * as SearchPage from "./components/Search/SearchPage.jsx";
import Publisher from "./models/publisher-model";
import React, { useState, useEffect } from "react";
import BookInstance from "./components/Books/BookInstance";
import PublisherInstance from "./components/Publishers/PublisherInstance";
import { stringToIntegerList } from "./common";

type responseA = {
  data: Author[]
  count: number
}
type responseB = {
  data: Book[]
  count: number
}
type responseP = {
  data: Publisher[]
  count: number
}

function createAuthor(a: Author) {
  return (
    <div>
      <AuthorsInstance
        author_id={a.author_id}
        author_name={a.author_name}
        author_tour={a.author_tour}
        author_summary={a.author_summary}
        author_image={a.author_image}
        year_born={a.year_born}
        nationality={a.nationality}
        genre={a.genre}
        noteable_works={a.noteable_works}
        book_connections={stringToIntegerList(a.book_connections)}
        publisher_connections={stringToIntegerList(a.publisher_connections)}
      />
    </div>
  );
}

function createBook(a: Book) {
  return (
    <div>
      <BookInstance
        id={a.book_id}
        name={a.name}
        genre={a.genre}
        publisher={a.publisher}
        year={a.year}
        page_count={a.page_count}
        price={a.price}
        avg_rating={a.avg_rating}
        maturity_rating={a.maturity_rating}
        description={a.description}
        image={a.image}
        authors={a.authors}
        author_connections={stringToIntegerList(a.author_connections)}
        publisher_connections={stringToIntegerList(a.publisher_connections)}
      />
    </div>
  );
}

function createPublisher(a: Publisher) {
  return (
    <div>
      <PublisherInstance
        id={a.publisher_id}
        summary={a.summary}
        name={a.name}
        image={a.image}
        origin={a.origin}
        publication_types={a.publication_types}
        founded={a.founded}
        parent_comp={a.parent_comp}
        headquarters={a.headquarters}
        website={a.website}
        author_connections={stringToIntegerList(a.author_connections)}
        book_connections={stringToIntegerList(a.book_connections)}
      />
    </div>
  );
}

function App() {
  let [authDataList, setAuthDataList] = useState<Author[]>([]);
  let [bookDataList, setBookDataList] = useState<Book[]>([]);
  let [publDataList, setPublDataList] = useState<Publisher[]>([]);

  async function getAuthorsData() {
    const authors: responseA = await fetch(`https://api.prideinwriting.me/api/authors`)
      .then((response) => {
        return response.json();
      })
      .catch((err) => {
        console.log(err);
        return {};
      });
    return authors.data as Author[];
  }

  async function getBooksData() {
    const books: responseB = await fetch(`https://api.prideinwriting.me/api/books`)
      .then((response) => {
        return response.json();
      })
      .catch((err) => {
        console.log(err);
        return {};
      });
    return books.data as Book[];
  }

  async function getPublisherData() {
    const publishers: responseP = await fetch(`https://api.prideinwriting.me/api/publishers`)
      .then((response) => {
        return response.json();
      })
      .catch((err) => {
        console.log(err);
        return {};
      });
    return publishers.data as Publisher[];
  }

  useEffect(() => {
    const getAuth = async () => {
      setAuthDataList(await getAuthorsData());
    };

    const getBook = async () => {
      setBookDataList(await getBooksData());
    };

    const getPublisher = async () => {
      setPublDataList(await getPublisherData());
    };

    getAuth();
    getBook();
    getPublisher();
  }, []);

  return (
    <div>
      {/* <Switch /> */}
      <Route data-testid="4444" exact path="/" component={HomePage} />
      <Route exact path="/AboutUs" component={AboutUs} />
      <Route
        exact
        path="/SearchPage"
        render={(x) => <SearchPage.SearchPage />}
      />
      <Route
        exact
        path="/Books"
        render={(x) => <Books/>}
      />
      <Route
        exact
        path="/Publishers"
        render={(x) => <Publishers dataLen={publDataList.length} />}
      />
      <Route
        exact
        path="/Authors"
        render={(x) => <Authors/>}
      />
      <div>
        {authDataList.map(function (author) {
          return (
            <Route
              key={("AuthorID-" + author.author_id) as string}
              exact
              path={("/author-" + author.author_id) as string}
              render={(x) => createAuthor(author as Author)}
            />
          );
        })}

        {bookDataList.map(function (book) {
          return (
            <Route
              key={("BookID-" + book.book_id) as string}
              exact
              path={("/book-" + book.book_id) as string}
              render={(x) => createBook(book as Book)}
            />
          );
        })}

        {publDataList.map(function (publisher) {
          return (
            <Route
              key={("PublisherID-" + publisher.publisher_id) as string}
              exact
              path={("/publisher-" + publisher.publisher_id) as string}
              render={(x) => createPublisher(publisher as Publisher)}
            />
          );
        })}
      </div>
      <p style={{ color: "white" }}>testParagraph</p>
    </div>
  );
}

export default App;
