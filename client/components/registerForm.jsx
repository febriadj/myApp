import React from 'react';
import '../styles/components/registerForm.scss';

function RegisterForm({ displayForm, closeRegisterForm, openLoginForm }) {
  return (
    <div className="register" style={displayForm}>
      <div className="registerWrap">
        <form method="post" className="registerForm" autoComplete="off">
          <button
            type="button"
            className="fas fa-times closeBtn"
            onClick={closeRegisterForm}
          >
          </button>
          <h2>Register yourself as admin of this website.</h2>
          <input type="text" name="username" className="input inputUsername" placeholder="Username" required />
          <input type="email" name="email" className="input inputEmail" placeholder="Email" required />
          <input type="password" name="password" className="input inputPassword" placeholder="Password" required />
          <button type="submit" className="submit">Register</button>
          <p className="ask">
            Already have an account?
            <button
              type="button"
              onClick={openLoginForm}
            >
              Login
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}

export default RegisterForm;
