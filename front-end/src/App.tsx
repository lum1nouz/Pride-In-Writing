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

function createLinks() {

  const authData2 = {
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
}

const authData = authData2 as Author


  return (
    <div>
      <AuthorsInstance author_id={authData.author_id} author_tour={authData.author_tour} nationality={authData.nationality} genre={authData.genre} noteable_works={authData.noteable_works} author_image ={authData.author_image} author_name ={authData.author_name} author_summary={authData.author_summary}/>
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

      <Route exact path="/author-1" render={(AuthorsInstance) => (createLinks())} />

    </div>
  );
}

export default App;
