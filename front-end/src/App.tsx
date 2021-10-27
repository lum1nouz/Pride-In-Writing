import css from "./App.module.css";
import HomePage from "./components/HomePage/HomePage";
import AboutUs from "./components/AboutUs/AboutUs";
import Books from "./components/Books/Books";
import Publishers from "./components/Publishers/Publishers";
import Putnam from "./components/Publishers/GPPutnam";
import Farrar from "./components/Publishers/Farrar";
import ViragoPress from "./components/Publishers/ViragoPress";
import Authors from "./components/Authors/Authors";
import PatriciaHighsmith from "./components/Authors/PatriciaHighsmith";
import MichaelCunningham from "./components/Authors/MichaelCunningham";
import SarahWaters from "./components/Authors/SarahWaters";
import { Route, Switch } from "react-router-dom";
import TheHours from "./components/Books/TheHours";
import ThePriceOfSalt from "./components/Books/ThePriceOfSalt";
import Fingersmith from "./components/Books/Fingersmith";
import AuthorsInstance from "./components/Authors/AuthorsInstance"
import Author from "./models/author-model";
import Book from "./models/book-model";
import Publisher from "./models/publisher-model";
import axios from "axios";
import { create } from "domain";
import BookInstance from "./components/Books/BookInstance";
import PublisherInstance from "./components/Publishers/PublisherInstance";
import stringToIntegerList from "./common";



const authData2 = [{
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



const bookData2 = [{
  id: 0,
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
  authors: ["Margaret",],
  author_connections: "10,15",
  publisher_connections:"15,20"
}]

const publData2 = [{
  id: 0,
  name: "123Books!!!",
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

const authDataList = authData2 as Author[]
const bookDataList = bookData2 as Book[]
const publDataList = publData2 as Publisher[]

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
      <BookInstance id={a.id} name={a.name} genre={a.genre} publisher={a.publisher} year={a.year} page_count ={a.page_count} price ={a.price} avg_rating={a.avg_rating} maturity_rating = {a.maturity_rating} description={a.description} image = {a.image} authors={a.authors} author_connections={stringToIntegerList(a.author_connections)} publisher_connections={stringToIntegerList(a.publisher_connections)}/>
    </div>
  )
}

function createPublisher(a: Publisher) {

  return (
    <div>
      <PublisherInstance id={a.id} name={a.name} image={a.image} origin={a.origin} publication_types={a.publication_types} founded ={a.founded} parent_comp ={a.parent_comp} headquarters={a.headquarters} website={a.website} author_connections={stringToIntegerList(a.author_connections)} book_connections={stringToIntegerList(a.book_connections)}/>
    </div>
  )
}



function App() {

  // await axios.get(`https://gitlab.com/api/v4/projects/29826417/issues_statistics`)
  // .then((res) => {
  //   tIssues = (res.data as issuesResponse).statistics.counts.closed;
  // });


  return (
    <div>
      {/* <Switch /> */}
      <Route exact path="/" component={HomePage} />
      <Route exact path="/AboutUs" component={AboutUs} />
      <Route exact path="/Books" component={Books} />
      <Route exact path="/Publishers" component={Publishers} />
      <Route exact path="/putnam" component={Putnam} />
      <Route exact path="/farrar" component={Farrar} />
      <Route exact path="/virago-press" component={ViragoPress} />
      <Route exact path="/Authors" component={Authors} />
      <Route exact path="/patricia-highsmith" component={PatriciaHighsmith} />
      <Route exact path="/michael-cunningham" component={MichaelCunningham} />
      <Route exact path="/sarah-waters" component={SarahWaters} />
      <Route exact path="/the-hours" component={TheHours} />
      <Route exact path="/the-price-of-salt" component={ThePriceOfSalt} />
      <Route exact path="/fingersmith" component={Fingersmith} />

      {authDataList.map(function(author){
        return <Route key={"AuthorID-" + author.author_id as string} exact path={"/author-" + author.author_id as string} render={(x) => (
          createAuthor(author as Author)
        )}/>
      })}

      {bookDataList.map(function(book){
        return <Route key={"BookID-" + book.id as string} exact path={"/book-" + book.id as string} render={(x) => (
          createBook(book as Book)
        )}/>
      })}

      {publDataList.map(function(publisher){
        return <Route key={"PublisherID-" + publisher.id as string} exact path={"/publisher-" + publisher.id as string} render={(x) => (
          createPublisher(publisher as Publisher)
        )}/>
      })}

    </div>
  );
}

export default App;
