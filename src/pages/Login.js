import React, { useState } from 'react';
import '../style/pages/login.css'; 
import pessoas from '../assets/pessoas.svg';
import login_ellipse from '../assets/login_ellipse.svg';

import { login } from '../api/api';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loginError, setLoginError] = useState(null);

  let navigate = useNavigate();

  function isValidEmail(email) {
    return /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/.test(email);
  }

  const handleChange = event => {
    if (!isValidEmail(event.target.value)) {
      setError('E-mail inválido');
    } else {
      setError(null);
    }

    setEmail(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = await login(email, password);
      console.log(token);
      localStorage.setItem('jwt', token);
      navigate('/home');
    } catch (error) {
      console.log(error);
      setLoginError('E-mail ou senha incorreto.');
    }
  }

  const isFormValid =  email && password;

  return (
      <div className="container-login">

        <img src={pessoas} alt="Pessoas" className="pessoas" />
        <div className="login-right-content">
          
          <div className="login-box">
            <div className="login-box-content">
              <h2 className='title-login'>Entrar</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group-login">
                  <label className="label-login"  htmlFor="username">e-mail</label>
                  <input className="input-login" 
                    type="text" 
                    id="username" 
                    name="username" 
                    placeholder="email@email.com"
                    value={email}
                    onChange={handleChange} 
                  />
                  {error && <h5 style={{color: 'red'}}>{error}</h5>}
                </div>
                <div className="form-group-login">
                  <label className="label-login" htmlFor="password">senha</label>
                  <input className="input-login" 
                    type="password" 
                    id="password" 
                    name="password" 
                    placeholder="************" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} 
                  />
                </div>
                <div className="buttons-login">
                  <div className="button-login-container">
                    <button className="button-login" type="submit" disabled={!isFormValid}>LOGIN</button>
                  </div>
                  <div className="button-login-container">
                    <button className="button-login" type="button">Recuperar senha</button>
                  </div>
                </div>
                {loginError && <h5 style={{color: 'red'}}>{loginError}</h5>}
              </form>
            </div>
          </div>
        </div>
        <div className="ellipse-login">
          <img src={login_ellipse}/>
        </div>
      </div>
  );
}

export default Login;
