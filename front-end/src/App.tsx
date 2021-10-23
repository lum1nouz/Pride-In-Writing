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

function App() {
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
    </div>
  );
}

export default App;
