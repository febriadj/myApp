import React, { useState } from 'react';

const isDev = process.env.NODE_ENV === 'development';

export default function VerifRegister({ closeRegisterForm, openLoginForm, handleRegisSession }) {
  // State notifikasi saat pengguna submit formulir
  const [notif, setNotif] = useState({
    status: null,
    message: '',
  });

  const [formData, setFormData] = useState({
    clientRegisCode: '',
    permissionCode: '',
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

      const endpoint = isDev ? 'http://localhost:8000/api/admin/register/accept' : '/api/admin/register/accept';
      const request = await (await fetch(endpoint, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          clientRegisCode: formData.clientRegisCode,
          permissionCode: formData.permissionCode,
        }),
      })).json();

      setFormData((prev) => ({
        ...prev, clientRegisCode: '', permissionCode: '',
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
        message: 'You have completed registration, now you can login with that account.',
      }));

      handleRegisSession();
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

    return (
      <div className="notif">
        <div className="notif_wrap">
          <p>{notif.message}</p>

          {
            notif.status
              ? <button type="button" onClick={openLoginForm}>Click me to Login</button>
              : null
          }
        </div>
      </div>
    );
  }

  return (
    <form method="post" className="register_form" onSubmit={handleSubmit}>
      <button
        type="button"
        className="close_btn"
        onClick={closeRegisterForm}
      >
        Close
      </button>
      <h2>Enter your Registration Code and Permission Code.</h2>
      <input
        type="number"
        name="clientRegisCode"
        className="input input_regis_code"
        placeholder="Registration Code"
        required
        value={formData.clientRegisCode}
        onChange={handleChange}
      />
      <input
        type="text"
        name="permissionCode"
        className="input input_permission_code"
        placeholder="Permission Code"
        required
        value={formData.permissionCode}
        onChange={handleChange}
      />
      <button type="submit" className="submit">Register</button>
      <NotifComponent />
    </form>
  );
}
