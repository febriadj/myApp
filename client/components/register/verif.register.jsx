import React, { useState } from 'react';

export default function VerifRegister({ closeRegisterForm }) {
  const [formData, setFormData] = useState({
    clientRegisCode: 0,
  });

  const handleChange = (event) => {
    setFormData((prev) => ({
      ...prev,
      clientRegisCode: event.target.value,
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
      <h2>Enter your 4-digit registration code.</h2>
      <input
        type="number"
        name="clientRegisCode"
        className="input inputRegisCode"
        required
        value={clientRegisCode}
        onChange={handleChange}
      />
      <button type="submit" className="submit">Register</button>
      <p className="ask">
        I have sent your registration code via email,
        please check your email again.
      </p>
    </form>
  );
}
