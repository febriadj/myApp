import React, { useEffect, useState } from 'react';
import Header from '../components/header';
import LoginForm from '../components/loginForm';

function Home() {
  const [loginFormIsOpen, setLoginFormIsOpen] = useState(false);

  const handleLoginForm = () => {
    setLoginFormIsOpen(true);
  }

  useEffect(() => {
    document.title = 'Febx - Let\'s share creativity';
  }, []);

  return (
    <React.Fragment>
      <Header
        formLogin={(event) => handleLoginForm(event)}
        formLoginValue={loginFormIsOpen}
      />
      {
        loginFormIsOpen ? <LoginForm /> : null
      }
    </React.Fragment>
  );
}

export default Home;
