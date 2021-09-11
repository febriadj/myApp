import React from 'react';
import '../styles/components/loginForm.scss';

function LoginForm() {
  return (
    <div className="login">
      <div className="loginWrap">
        <form method="post" className="loginForm">
          <h2>Login to manage the content of this website.</h2>
          <input type="text" name="nameOrEmail" className="input inputNameOrEmail" placeholder="Username" />
          <input type="password" name="password" className="input inputPassword" placeholder="Password" />
          <button type="submit" className="submit">Login</button>
          <p className="ask">
            Don't have an account yet?
            <button type="button">Register</button>
          </p>
        </form>
      </div>
    </div>
  )
}

export default LoginForm;
