import React, { useState } from 'react';

const isDev = process.env.NODE_ENV === 'development';

function FormRegister({ closeRegisterForm, openLoginForm, handleRegisSession }) {
  // State notifikasi saat pengguna submit formulir
  const [notif, setNotif] = useState({
    status: null,
    message: '',
  });

  // State formulir pendaftaran
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
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

      const endpoint = isDev ? 'http://localhost:8000/api/admin/register' : '/api/admin/register';
      const request = await (await fetch(endpoint, {
        method: 'post',
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
        ...prev,
        username: '',
        email: '',
        password: '',
        permissionCode: '',
      }));

      if (request.status === 'failed') {
        const newErr = {
          message: request.message,
        }
        throw newErr;
      }

      setNotif((prev) => ({
        ...prev,
        status: true,
        message: 'Your account has been successfully created, please complete the next step',
      }));
    }
    catch (error0) {
      const { message } = error0;

      setNotif((prev) => ({
        ...prev, status: false, message,
      }));

      console.error(message);
    }
  }

  const NotifComponent = () => {
    if (notif.status === null) return null;

    const closeNotif = () => {
      setNotif((prev) => ({
        ...prev, status: null, message: '',
      }));

      return handleRegisSession();
    }

    return (
      <div className="notif">
        <div className="notifWrap">
          <p>{notif.message}</p>

          {
            notif.status === true
              ? <button type="button" onClick={() => closeNotif()}>Next Step</button>
              : <button type="submit" onClick={() => closeNotif()}>Re-Registrasion</button>
          }
        </div>
      </div>
    )
  }

  return (
    <form method="post" className="registerForm" onSubmit={handleSubmit}>
      <NotifComponent />
      <button
        type="button"
        className="fas fa-times closeBtn"
        onClick={closeRegisterForm}
      >
      </button>
      <h2>Register yourself as admin of this website.</h2>
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

      <p className="ask">
        Already have an account?

        <button type="button" onClick={openLoginForm}>
          Login
        </button>
      </p>
    </form>
  );
}

export default FormRegister;
