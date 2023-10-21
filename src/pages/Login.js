import React from 'react';
import '../style/pages/login.css'; 
import pessoas from '../assets/pessoas.png';

function Login() {
  return (
    <div className="login-container">
      <img src={pessoas} alt="Pessoas" className="pessoas" />
      <div className="login-box">
        <div className="login-box-content">
          <h2>Entrar</h2>
          <form>
            <div className="form-group">
              <label htmlFor="username">e-mail</label>
              <input type="text" id="username" name="username" />
            </div>
            <div className="form-group">
              <label htmlFor="password">senha</label>
              <input type="password" id="password" name="password" />
            </div>
            <button type="submit">LOGIN</button>
            <button type="button">Recuperar senha</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
