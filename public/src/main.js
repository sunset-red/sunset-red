import React from "react";
import ReactDOM from "react-dom";
import {Router, Route, IndexRoute, hashHistory} from "react-router"

import App from "./components/App";
import HomePage from './components/homepage';
import PersonPage from './components/personpage';
import SignUpPage from './components/signup-page';
import ForgetPage from './components/forgetPage';
import FirstHome from './components/firstHome';
import LoveLife from './components/love_life/love-life';
import LoveHealth from './components/love_health/love-health';
import ShowHappiness from './components/show_happiness/show-happiness';
import MoodDiary from './components/mood_diary/mood-diary';

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path='/' component={App}>
      <IndexRoute component={HomePage}/>
      <Route path='personPage' component={PersonPage}/>
      <Route path='signUpPage' component={SignUpPage}/>
      <Route path='forgetPage' component={ForgetPage}/>
      <Route path='firstHome' component={FirstHome}/>
      <Route path='loveLife' component={LoveLife}/>
      <Route path='loveHealth' component={LoveHealth}/>
      <Route path='showHappiness' component={ShowHappiness}/>
      <Route path='moodDiary' component={MoodDiary}/>
    </Route>
  </Router>
  , document.getElementById("app")
);
