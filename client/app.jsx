import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom'

import './styles/utils/app.scss';

import Navbar from './containers/navbar';

import Default from './pages/default';
import Home from './pages/home';
import DashArticle from './pages/dashboard/article';
import Articles from './pages/articles';
import ArticleContent from './pages/articleContent';
import Portfolio from './pages/portfolio';

const isDev = process.env.NODE_ENV === 'development';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState({
    status: false, data: null,
  });

  const handleIsLoggedIn = async () => {
    const endpoint1 = isDev ? 'http://localhost:8000/api/admin/session' : '/api/admin/session';
    const requestToken = await (await fetch(endpoint1)).json();

    if ('admin' in requestToken.data === false || !requestToken.data.admin) {
      return setIsLoggedIn((prev) => ({
        ...prev, status: false, data: null,
      }));
    }

    const endpoint2 = isDev ? 'http://localhost:8000/api/admin' : '/api/admin';
    const requestAdmin = await (await fetch(endpoint2, {
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
      <Navbar isLoggedIn={isLoggedIn} handleIsLoggedIn={handleIsLoggedIn} />

      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/dashboard">{isLoggedIn.status ? <DashArticle isLoggedIn={isLoggedIn} /> : <Default />}</Route>
        <Route exact path="/articles" component={Articles} />
        <Route exact path="/articles/:url" component={ArticleContent} />
        <Route exact path="/portfolio" component={Portfolio} />
        <Route component={Default} />
      </Switch>
    </Router>
  );
}
