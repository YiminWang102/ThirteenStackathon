import './index.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory, IndexRoute, IndexRedirect } from 'react-router';
import store from './store';
import HomePage from './components/HomePage';
import HandBuilder from './components/HandBuilder';
import Practice from './components/Practice';
import PlayRoom from './components/PlayRoom';
import GamePage from './components/GamePage';
import Room from './components/Room';
import App from './components/App';
import axios from 'axios';

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <Route path="/home" component={HomePage} />
        <Route path="/handbuilder" component={HandBuilder} />
        <Route path="/practice" component={Practice} />
        <Route path="/play" component={PlayRoom} />
        <Route path="/room/:roomId" component={Room} />
        <Route path="/cards" component={GamePage} />
        <IndexRedirect to="/home"/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);
