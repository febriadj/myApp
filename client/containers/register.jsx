import React, { useEffect, useState } from 'react';
import '../styles/containers/register.scss';
// Import Komponen
import FormRegister from '../components/register/form.register';
import VerifRegister from '../components/register/verif.register';

const isDev = process.env.NODE_ENV === 'development';

function Register({ displayForm, closeRegisterForm, openLoginForm }) {
  // State data registrasi dari Session
  const [regisSession, setRegisSession] = useState({});

  const handleRegisSession = async () => {
    try {
      const endpoint = isDev ? 'http://localhost:8000/api/admin/session' : '/api/admin/session';
      const request = await (await fetch(endpoint)).json();
      // Cek apakah ada properti regisData didalam Session
      if ('regisData' in request.data === false) {
        const newErr = {
          message: 'Error detected while sending request to session',
        }
        throw newErr;
      }

      const { username, email, password } = request.data.regisData;
      // Memasukkan data registrasi dari Session kedalam state
      setRegisSession((prev) => ({
        ...prev, username, email, password, code: request.data.regisData.regisCode,
      }));
    }
    catch (error0) {
      console.error(error0.message);
    }
  }

  const Components = () => {
    if ('code' in regisSession === false) {
      return <FormRegister
        closeRegisterForm={closeRegisterForm}
        handleRegisSession={handleRegisSession}
      />
    }

    return <VerifRegister
      closeRegisterForm={closeRegisterForm}
      openLoginForm={openLoginForm}
      handleRegisSession={handleRegisSession}
    />
  }

  useEffect(() => {
    handleRegisSession();
  }, []);

  return (
    <div className="register" style={displayForm}>
      <div className="register_wrap">
        <Components />
        <p className="ask">
          Already have an account?

          <button type="button" onClick={openLoginForm}>
            Login
          </button>
        </p>
      </div>
    </div>
  );
}

export default Register;
