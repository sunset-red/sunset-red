import React from "react";
import ReactDOM from "react-dom";
import {Router, Route, IndexRoute, hashHistory} from "react-router"

import App from "./components/App";
import HomePage from './components/homepage';
import PersonPage from './components/personpage';
import SignUpPage from './components/signup-page';
import forgetPage from './components/forgetPage';


ReactDOM.render(
  <Router history={hashHistory}>
    <Route path='/' component={App}>
      <IndexRoute component={HomePage}/>
      <Route path='personPage' component={PersonPage}/>
      <Route path='signUpPage' component={SignUpPage}/>
      <Route path='forgetPage' component={forgetPage}/>

    </Route>
  </Router>
  , document.getElementById("app")
);
