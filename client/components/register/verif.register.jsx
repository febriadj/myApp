import React, { useState } from 'react';

export default function VerifRegister({ closeRegisterForm, openLoginForm }) {
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

      const request = await (await fetch('http://localhost:8000/api/admin/register/accept', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          clientRegisCode: formData.clientRegisCode,
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
        message: 'you have completed registration, now you can login with that account.',
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
    }

    return (
      <div className="notif">
        <div className="notifWrap">
          <p>{notif.message}</p>

          {
            notif.status === true
              ? <button type="button" onClick={openLoginForm}>Click me to Login</button>
              : <button type="button" onClick={() => closeNotif()}>Close</button>
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
      <h2>Enter your Registration Code and Permission Code.</h2>
      <input
        type="number"
        name="clientRegisCode"
        className="input inputRegisCode"
        placeholder="Registration Code"
        required
        value={formData.clientRegisCode}
        onChange={handleChange}
      />
      <input
        type="text"
        name="permissionCode"
        className="input inputPermissionCode"
        placeholder="Permission Code"
        required
        value={formData.permissionCode}
        onChange={handleChange}
      />
      <button type="submit" className="submit">Register</button>
      <p className="ask">
        I have sent your registration code by email,
        please check your email again. Then for the permission code
        please report it personally with the owner of this website
      </p>
    </form>
  );
}
