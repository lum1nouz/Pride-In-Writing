import React from 'react';
import logo from './logo.svg';
import Header from './components/Header/Header'
import './App.css';
import Page  from './components/Page/Page';
import ListPage from './components/ListPage/ListPage'
import testPage  from './components/Page/testPage';
import { Route, Link, Switch } from 'react-router-dom';

function App() {
  return (
    <div>
      <Switch/> 
        <Route exact path="/" component={testPage}/>
        <Route exact path="/page" component={Page}/>
        <Route exact path="/page" component={Page}/>
        <Route exact path="/listPage" component={ListPage}/>
    </div>
  );
}

export default App;
