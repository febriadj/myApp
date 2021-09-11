import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom'

// Import Pages
import Default from './pages/default';
import Home from './pages/home';

export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route component={Default} />
      </Switch>
    </Router>
  );
}
