import css from "./App.module.css";
import HomePage from "./components/HomePage/HomePage";
import AboutUs from "./components/AboutUs/AboutUs";
import Books from "./components/Books/Books";
import Publishers from "./components/Publishers/Publishers";
import Authors from "./components/Authors/Authors";
import { Route, Switch } from "react-router-dom";
import AuthorsInstance from "./components/Authors/AuthorsInstance"
import Author from "./models/author-model";
import Book from "./models/book-model";
import Publisher from "./models/publisher-model";
import { useState, useEffect } from "react";
import BookInstance from "./components/Books/BookInstance";
import PublisherInstance from "./components/Publishers/PublisherInstance";
import stringToIntegerList from "./common";
import useAxios from "axios-hooks";

const authData2: Author[] = [{
  author_id: 0,
  author_name : "test",
  author_tour : "false",
  author_summary : undefined,
  author_image : "https://api.penguinrandomhouse.com/title/client/Public/domains/PRH.US/authors/72509",
  year_born : "2022",
  nationality : "None",
  genre : "testGenre",
  noteable_works : "testNw",
  book_connections : "20,25",
  publisher_connections : "30,35"
}, {
  author_id: 1,
  author_name : "test2",
  author_tour : "false",
  author_summary : undefined,
  author_image : "https://api.penguinrandomhouse.com/title/client/Public/domains/PRH.US/authors/72509",
  year_born : "2022",
  nationality : "None",
  genre : "testGenre",
  noteable_works : "testNw",
  book_connections : "20,25",
  publisher_connections : "30,35"
}]



const bookData2: Book[] = [{
  book_id: 0,
  name: "Killer Bee",
  genre: "Books",
  publisher: "Publishing Co",
  year:  "1995",
  page_count: 1432,
  price: 6.99,
  avg_rating: 4.5,
  maturity_rating: "MATURE",
  description: "This is a fantastic book",
  image: "http://books.google.com/books/content?id=PN5hAwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api,%5B",
  authors: ["Margaret", "Amy", "Donald"],
  author_connections: "10,15",
  publisher_connections:"15,20"
}]

const publData2: Publisher[] = [{
  publisher_id: 0,
  name: "123Books!!!",
  summary: "hahaha",
  image: "https://upload.wikimedia.org/wikipedia/en/3/32/Atria_logo.png",
  origin: "texas",
  publication_types: "Books",
  founded:  "1993",
  parent_comp: "ABC",
  headquarters: "DEF",
  website: "http://www.simonandschusterpublishing.com/atria/index.html",
  author_connections: "15,20",
  book_connections: "25, 30"
}]

type autResponse = {
  authors: Author[]
}

function createAuthor(a: Author) {

  return (
    <div>
      <AuthorsInstance author_id={a.author_id} author_name={a.author_name} author_tour={a.author_tour} author_summary={a.author_summary} author_image={a.author_image} year_born ={a.year_born} nationality ={a.nationality} genre={a.genre} noteable_works={a.noteable_works} book_connections={stringToIntegerList(a.book_connections)} publisher_connections={stringToIntegerList(a.publisher_connections)}/>
    </div>
  )
}

function createBook(a: Book) {

  return (
    <div>
      <BookInstance id={a.book_id} name={a.name} genre={a.genre} publisher={a.publisher} year={a.year} page_count ={a.page_count} price ={a.price} avg_rating={a.avg_rating} maturity_rating = {a.maturity_rating} description={a.description} image = {a.image} authors={a.authors} author_connections={stringToIntegerList(a.author_connections)} publisher_connections={stringToIntegerList(a.publisher_connections)}/>
    </div>
  )
}

function createPublisher(a: Publisher) {

  return (
    <div>
      <PublisherInstance id={a.publisher_id} summary={a.summary} name={a.name} image={a.image} origin={a.origin} publication_types={a.publication_types} founded ={a.founded} parent_comp ={a.parent_comp} headquarters={a.headquarters} website={a.website} author_connections={stringToIntegerList(a.author_connections)} book_connections={stringToIntegerList(a.book_connections)}/>
    </div>
  )
}

const config = {
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
  }
};



function App() {
  let [authDataList, setAuthDataList] = useState<Author[]>(authData2)
  let [bookDataList, setBookDataList] = useState<Book[]>(bookData2)
  let [publDataList, setPublDataList] = useState<Publisher[]>(publData2)

  async function getAuthorsData(){
    const authors = await fetch(`https://api.prideinwriting.me/api/authors`)
      .then((response) => {
        return response.json();
      })
      .catch((err) => {
        console.log(err);
        return {};
      });
    return authors as Author[];
  }
  
  async function getBooksData(){
    const books = await fetch(`https://api.prideinwriting.me/api/books`)
      .then((response) => {
        return response.json();
      })
      .catch((err) => {
        console.log(err);
        return {};
      });
    return books as Book[];
  }
  
  async function getPublisherData(){
    const publishers = await fetch(`https://api.prideinwriting.me/api/publishers`)
      .then((response) => {
        return response.json();
      })
      .catch((err) => {
        console.log(err);
        return {};
      });
    return publishers as Publisher[];
  }

//   useEffect(() => {
//     const getAuth = async () => {
//         setAuthDataList(await getAuthorsData())
//     }

//     const getBook = async () => {
//       setBookDataList(await getBooksData())
//     }

//     const getPublisher = async () => {
//       setPublDataList(await getPublisherData())
//     }

//     getAuth();
//     getBook();
//     getPublisher();

//  }, [])

  return (
    <div>
      {/* <Switch /> */}
      <Route exact path="/" component={HomePage} />
      <Route exact path="/AboutUs" component={AboutUs} />
      <Route exact path="/Books" component={Books} />
      <Route exact path="/Publishers" component={Publishers} />
      <Route exact path="/Authors" component={Authors} />
      <div>


      {authDataList.map(function(author){
        return <Route key={"AuthorID-" + author.author_id as string} exact path={"/author-" + author.author_id as string} render={(x) => (
          createAuthor(author as Author)
        )}/>
      })}

      {bookDataList.map(function(book){
        return <Route key={"BookID-" + book.book_id as string} exact path={"/book-" + book.book_id as string} render={(x) => (
          createBook(book as Book)
        )}/>
      })}

      {publDataList.map(function(publisher){
        return <Route key={"PublisherID-" + publisher.publisher_id as string} exact path={"/publisher-" + publisher.publisher_id as string} render={(x) => (
          createPublisher(publisher as Publisher)
        )}/>
      })}
      </div>
    </div>
  );
}

export default App;
