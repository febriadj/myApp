import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom'

import './styles/utils/app.scss';

// Import Pages
import Default from './pages/default';
import Home from './pages/home';

import Header from './components/header';
import RegisterForm from './components/registerForm';
import LoginForm from './components/loginForm';

export default function App() {
  const [loginFormIsOpen, setLoginFormIsOpen] = useState(false);
  const [registerFormIsOpen, setRegisterFormIsOpen] = useState(false);

  // Handle buka & tutup formulir login
  const handleOpenLoginForm = () => {
    setRegisterFormIsOpen(false);
    setLoginFormIsOpen(true);
  }
  const handleOpenRegisterForm = () => {
    setLoginFormIsOpen(false);
    setRegisterFormIsOpen(true);
  }
  const handleCloseLoginForm = () => setLoginFormIsOpen(false);
  const handleCloseRegisterForm = () => setRegisterFormIsOpen(false);

  return (
    <Router>
      <Header
        openLoginForm={() => handleOpenLoginForm()}
        bgIcon={registerFormIsOpen || loginFormIsOpen ? { backgroundColor: '#f3f0df' } : null}
      />
      <LoginForm
        openRegisterForm={() => handleOpenRegisterForm()}
        closeLoginForm={() => handleCloseLoginForm()}
        displayForm={loginFormIsOpen ? { opacity: 1, zIndex: 8 } : { opacity: 0, zIndex: -8 }}
      />
      <RegisterForm
        closeRegisterForm={() => handleCloseRegisterForm()}
        openLoginForm={() => handleOpenLoginForm()}
        displayForm={registerFormIsOpen ? { opacity: 1, zIndex: 8 } : { opacity: 0, zIndex: -8 }}
      />

      <Switch>
        <Route exact path="/" component={Home} />
        <Route component={Default} />
      </Switch>
    </Router>
  );
}
