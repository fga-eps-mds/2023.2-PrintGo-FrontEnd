<<<<<<< HEAD
import React, { useState } from 'react';
import '../style/pages/login.css'; 
import pessoas from '../assets/pessoas.svg';
import { login } from '../api/api';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loginError, setLoginError] = useState(null);

  let navigate = useNavigate();

  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
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
      <div className="container">
        <img src={pessoas} alt="Pessoas" className="pessoas" />
        <div>
          <div className="ellipse"/>
          <div className="login-box">
            <div className="login-box-content">
              <h2>Entrar</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="username">e-mail</label>
                  <input 
                    type="text" 
                    id="username" 
                    name="username" 
                    placeholder="email@email.com"
                    value={email}
                    onChange={handleChange} 
                  />
                  {error && <h5 style={{color: 'red'}}>{error}</h5>}
                </div>
                <div className="form-group">
                  <label htmlFor="password">senha</label>
                  <input 
                    type="password" 
                    id="password" 
                    name="password" 
                    placeholder="************" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} 
                  />
                </div>
                <div className="buttons">
                  <div className="button-container">
                    <button type="submit" disabled={!isFormValid}>LOGIN</button>
                  </div>
                  <div className="button-container">
                    <button type="button">Recuperar senha</button>
                  </div>
                </div>
                {loginError && <h5 style={{color: 'red'}}>{loginError}</h5>}
              </form>
            </div>
          </div>
        </div>
      </div>
=======
import React from 'react';
import '../style/pages/login.css'; 
import pessoas from '../assets/pessoas.png';

function Login() {
  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-box-content">
          <h2>Entrar</h2>
        </div>
      </div>
    </div>
>>>>>>> 9fa7c21 (💡(#150): implementacao pagina de login)
  );
}

export default Login;
