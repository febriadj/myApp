import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../styles/containers/login.scss';

function Login({
  handleIsLoggedIn,
  isLoggedIn,
  closeLoginForm,
  displayForm,
  openRegisterForm,
}) {
  const history = useHistory();
  const [notif, setNotif] = useState({ status: null, message: '' });

  const [formData, setFormData] = useState({
    nameOrEmail: '', password: '',
  });

  const handleChange = (event) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  }

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();

      const request = await (await fetch('http://localhost:8000/api/admin/login', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nameOrEmail: formData.nameOrEmail,
          password: formData.password,
        }),
      })).json();

      setFormData((prev) => ({ ...prev, nameOrEmail: '', password: '' }));

      if (request.status === 'failed') {
        const newErr = {
          message: request.message,
        }
        throw newErr;
      }

      setNotif((prev) => ({
        ...prev,
        status: true,
        message: 'You have successfully logged in, I will redirect you to the Dashboard page',
      }));

      handleIsLoggedIn();
    }
    catch (error0) {
      const { message } = error0;

      setNotif((prev) => ({
        ...prev, status: false, message,
      }));
    }
  }

  const NotifComponent = () => {
    if (notif.status === null) return null;

    const closeNotif = () => {
      setNotif((prev) => ({
        ...prev, status: null, message: '',
      }));

      // Kondisi jika sudah berhasil login
      if (isLoggedIn.status) {
        closeLoginForm();
        // Pindah ke halaman Dashboard
        history.push('/dashboard');
      }
    }

    return (
      <div className="notif">
        <div className="notifWrap">
          <p>{notif.message}</p>

          {
            notif.status === true
              ? <button type="button" onClick={() => closeNotif()}>Close</button>
              : <button type="button" onClick={() => closeNotif()}>Re-Enter</button>
          }
        </div>
      </div>
    );
  }

  return (
    <div className="login" style={displayForm}>
      <div className="loginWrap">
        <form method="post" className="loginForm" onSubmit={handleSubmit}>
          <NotifComponent />
          <button
            type="button"
            className="fas fa-times closeBtn"
            onClick={closeLoginForm}
          >
          </button>
          <h2>Login to manage the content of this website.</h2>
          <input
            type="text"
            name="nameOrEmail"
            className="input inputNameOrEmail"
            placeholder="Username or Email"
            required
            value={formData.nameOrEmail}
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

export default Login;
