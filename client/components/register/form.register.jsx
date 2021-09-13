import React, { useState } from 'react';

function FormRegister({ closeRegisterForm, openLoginForm }) {
  // State formulir pendaftaran
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
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

      const request = await (await fetch('http://localhost:8000/api/admin/register', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
          permissionCode: formData.permissionCode,
        }),
      })).json();

      setFormData((prev) => ({
        ...prev,
        username: '',
        email: '',
        password: '',
        permissionCode: '',
      }));

      console.log(request);
    }
    catch (error0) {
      console.error(error0);
    }
  }

  return (
    <form method="post" className="registerForm" onSubmit={handleSubmit}>
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
        Already have an account?

        <button type="button" onClick={openLoginForm}>
          Login
        </button>
      </p>
    </form>
  );
}

export default FormRegister;
