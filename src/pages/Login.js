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
        </div>
      </div>
    </div>
  );
}

export default Login;
