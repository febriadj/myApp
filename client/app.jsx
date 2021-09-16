import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom'

import './styles/utils/app.scss';

import Default from './pages/default';
import Home from './pages/home';
import Dashboard from './pages/dashboard';

import Header from './containers/header';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleSession = async () => {
    const request = await (await fetch('http://localhost:8000/api/admin/session')).json();

    if ('admin' in request.data === false) {
      return setIsLoggedIn(false);
    }

    return setIsLoggedIn(true);
  }

  useEffect(() => handleSession());

  return (
    <Router>
      <Header tokenInSession={isLoggedIn} handleTokenInSession={handleSession} />

      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/dashboard">{isLoggedIn ? <Dashboard /> : <Redirect to="/" />}</Route>
        <Route component={Default} />
      </Switch>
    </Router>
  );
}
