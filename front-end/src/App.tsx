import React from 'react';
import logo from './logo.svg';
import Header from './components/Header/Header'
import './App.css';
import Page from './components/Page/Page';
import testPage from './components/Page/testPage';
import PatriciaHighsmith from './components/Authors/PatriciaHighsmith';
import { Route, Link, Switch } from 'react-router-dom';

function App() {
  return (
    <div>
      <Switch/> 
        <Route exact path="/" component={testPage}/>
        <Route exact path="/page" component={Page}/>
        <Route exact path="/page" component={Page}/>
        <Route exact path="/page" component={Page}/>
        <Route exact path="/patricia-highsmith" component={PatriciaHighsmith}/>
    </div>
  );
}

export default App;
