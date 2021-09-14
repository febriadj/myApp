import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom'

import './styles/utils/app.scss';

import Default from './pages/default';
import Home from './pages/home';

import Header from './containers/header';

export default function App() {
  return (
    <Router>
      <Header />

      <Switch>
        <Route exact path="/" component={Home} />
        <Route component={Default} />
      </Switch>
    </Router>
  );
}
