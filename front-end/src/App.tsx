import React from 'react';
import logo from './logo.svg';
import Header from './components/Header/Header'
import './App.css';
import Page from './components/Page/Page';
import testPage from './components/Page/testPage';
import PatriciaHighsmith from './components/Authors/PatriciaHighsmith';
import ListPage from './components/ListPage/ListPage'
import Books from './components/Books/Books'
import Publishers from './components/Publishers/Publishers'
import AboutUs from './components/AboutUs/AboutUs';
import Authors from './components/Authors/Authors';
import { Route, Link, Switch } from 'react-router-dom';

function App() {
  return (
    <div>
      <Switch/> 
        <Route exact path="/" component={testPage}/>
        <Route exact path="/Books" component={Books}/>
        <Route exact path="/Publishers" component={Publishers}/>
        <Route exact path="/AboutUs" component={AboutUs}/>
        <Route exact path="/page" component={Page}/>
        <Route exact path="/page" component={Page}/>
        <Route exact path="/page" component={Page}/>
        <Route exact path="/Authors" component={Authors}/>
        <Route exact path="/patricia-highsmith" component={PatriciaHighsmith}/>
    </div>
  );
}

export default App;
