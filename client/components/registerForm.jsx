import React, { useEffect, useState } from 'react';
import '../styles/components/registerForm.scss';

function RegisterForm({ displayForm, closeRegisterForm, openLoginForm }) {
  const [regisSession, setRegisSession] = useState({});
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleRegisSession = async () => {
    try {
      const request = await (await fetch('/api/admin/session')).json();

      if ('regisData' in request.data === false) {
        const newErr = {
          message: 'regisData property not found',
        }
        throw newErr;
      }

      const { username, email, password } = request.data.regisData;

      setRegisSession((prev) => ({
        ...prev, username, email, password, code: request.data.regisData.code,
      }));
    }
    catch (error0) {
      console.error(error0.message);
    }
  }

  const handleChange = (event) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const request = await (await fetch('/api/admin/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }),
      })).json();

      setFormData((prev) => ({
        ...prev, username: '', email: '', password: '',
      }));

      console.log(request);
      handleRegisSession();
    }
    catch (error0) {
      console.error(error0.message);
    }
  }

  useEffect(() => {
    handleRegisSession();
  }, []);

  return (
    <div className="register" style={displayForm}>
      <div className="registerWrap">
        <form method="post" className="registerForm" onSubmit={handleSubmit}>
          <button
            type="button"
            className="fas fa-times closeBtn"
            onClick={closeRegisterForm}
          >
          </button>
          {
            'code' in regisSession
              ? <h2>Enter the code to complete your account registration</h2>
              : <h2>Register yourself as admin of this website.</h2>
          }
          <input
            type="text"
            name="username"
            className="input inputUsername"
            placeholder="Username"
            required
            value={formData.username}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            className="input inputEmail"
            placeholder="Email"
            required
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            className="input inputPassword"
            placeholder="Password"
            required
            value={formData.password}
            onChange={handleChange}
          />
          <button type="submit" className="submit">Register</button>

          <p className="ask">Already have an account?
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
