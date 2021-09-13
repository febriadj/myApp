import React from 'react';
import '../styles/containers/login.scss';

function LoginForm({ displayForm, closeLoginForm, openRegisterForm }) {
  return (
    <div className="login" style={displayForm}>
      <div className="loginWrap">
        <form method="post" className="loginForm" autoComplete="off">
          <button
            type="button"
            className="fas fa-times closeBtn"
            onClick={closeLoginForm}
          >
          </button>
          <h2>Login to manage the content of this website.</h2>
          <input type="text" name="nameOrEmail" className="input inputNameOrEmail" placeholder="Username or Email" required />
          <input type="password" name="password" className="input inputPassword" placeholder="Password" required />
          <button type="submit" className="submit">Login</button>
          <p className="ask">
            Don't have an account yet?
            <button
              type="button"
              onClick={openRegisterForm}
            >
              Register
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
