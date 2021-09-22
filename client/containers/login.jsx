import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../styles/containers/login.scss';

const isDev = process.env.NODE_ENV === 'development';

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

      const endpoint = isDev ? 'http://localhost:8000/api/admin/login' : '/api/admin/login';
      const request = await (await fetch(endpoint, {
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

    // Kondisi jika sudah berhasil login
    if (isLoggedIn.status) {
      closeLoginForm();
      // Pindah ke halaman Dashboard
      return history.push('/dashboard');
    }

    return (
      <div className="notif">
        <div className="notif_wrap">
          <p>{notif.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="login" style={displayForm}>
      <div className="login_wrap">
        <form method="post" className="login_form" onSubmit={handleSubmit}>
          <button
            type="button"
            className="close_btn"
            onClick={closeLoginForm}
          >
            Close
          </button>
          <h2>Login to manage the content of this website.</h2>
          <input
            type="text"
            name="nameOrEmail"
            className="input input_nameOrEmail"
            placeholder="Username or Email"
            required
            value={formData.nameOrEmail}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            className="input input_password"
            placeholder="Password"
            required
            value={formData.password}
            onChange={handleChange}
          />
          <button type="submit" className="submit">Login</button>
          <NotifComponent />
        </form>
        <p className="ask">
          Don't have an account yet?
          <button
            type="button"
            onClick={openRegisterForm}
          >
            Register
          </button>
        </p>
      </div>
    </div>
  );
}

export default Login;
