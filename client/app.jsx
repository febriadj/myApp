import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom'

import './styles/utils/app.scss';

import Header from './containers/header';

import Default from './pages/default';
import Home from './pages/home';
import Dashboard from './pages/dashboard';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState({
    status: false, data: null,
  });

  const handleIsLoggedIn = async () => {
    const requestToken = await (await fetch('http://localhost:8000/api/admin/session')).json();

    if ('admin' in requestToken.data === false) {
      return setIsLoggedIn((prev) => ({
        ...prev, status: false, data: null,
      }));
    }

    const requestAdmin = await (await fetch('http://localhost:8000/api/admin', {
      method: 'get',
      headers: {
        Authorization: `Bearer ${requestToken.data.admin}`,
      },
    })).json();

    // Memasukkan token kedalam Object data admin
    requestAdmin.data.token = requestToken.data.admin;

    return setIsLoggedIn((prev) => ({
      ...prev, status: 'success', data: requestAdmin.data,
    }));
  }

  useEffect(() => handleIsLoggedIn(), []);

  return (
    <Router>
      <Header isLoggedIn={isLoggedIn} handleIsLoggedIn={handleIsLoggedIn} />

      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/dashboard" component={isLoggedIn.status ? Dashboard : Default} />
        <Route component={Default} />
      </Switch>
    </Router>
  );
}
