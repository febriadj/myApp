import React, { useEffect, useState } from 'react';
import '../styles/components/registerForm.scss';
import FormRegister from '../components/register/form.register';
import VerifRegister from '../components/register/verif.register';

function Register({ displayForm, closeRegisterForm, openLoginForm }) {
  // State data registrasi dari Session
  const [regisSession, setRegisSession] = useState({});

  const handleRegisSession = async () => {
    try {
      const request = await (await fetch('http://localhost:8000/api/admin/session')).json();
      // Cek apakah ada properti regisData didalam Session
      if ('regisData' in request.data === false) {
        const newErr = {
          message: 'regisData property not found',
        }
        throw newErr;
      }

      const { username, email, password } = request.data.regisData;
      // Memasukkan data registrasi dari Session kedalam state
      setRegisSession((prev) => ({
        ...prev, username, email, password, code: request.data.regisData.code,
      }));
    }
    catch (error0) {
      console.error(error0.message);
    }
  }

  const Components = () => {
    if ('code' in regisSession) {
      return <VerifRegister closeRegisterForm={closeRegisterForm} />
    }

    return <FormRegister
      closeRegisterForm={closeRegisterForm}
      openLoginForm={openLoginForm}
    />
  }

  useEffect(() => handleRegisSession(), []);

  return (
    <div className="register" style={displayForm}>
      <div className="registerWrap">
        <Components />
      </div>
    </div>
  );
}

export default Register;
