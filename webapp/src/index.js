import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import registerServiceWorker from './registerServiceWorker';
import App from './App';
import Home from './pages/Home';
import Repos from './pages/Repos';

import './index.css';

const history = createBrowserHistory();

ReactDOM.render(
  <Router history={history}>
    <App>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route strict path="/:id" component={Repos} />
        <Redirect from="*" exact to="/" />
        <Route path="*" component={Home} />
      </Switch>
    </App>
  </Router>,
  document.getElementById('root')
);
registerServiceWorker();
