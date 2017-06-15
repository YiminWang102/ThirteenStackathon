import './index.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import store from './store';
import { Main, Login, Signup, UserHome} from './components';
import HomePage from './components/HomePage';
import HandBuilder from './components/HandBuilder';
import Practice from './components/Practice';
import PlayRoom from './components/PlayRoom';
import Room from './components/Room';

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={HomePage} />
      <Route path="/handbuilder" component={HandBuilder} />
      <Route path="/practice" component={Practice} />
      <Route path="/play" component={PlayRoom} />
      <Route path="/room" component={Room} />
    </Router>
  </Provider>,
  document.getElementById('app')
);

// <Route path="/" component={Main}>
//   <IndexRoute component={Login} />
//   <Route path="login" component={Login} />
//   <Route path="signup" component={Signup} />
//   <Route onEnter={requireLogin}>
//     <Route path="home" component={UserHome} />
//   </Route>
// </Route>
