import React from 'react';
import '../style/pages/login.css'; 
import pessoas from '../assets/pessoas.svg';

function Login() {
  return (
    <body>
      <div className="container">
        <img src={pessoas} alt="Pessoas" className="pessoas" />
        <div>
          <div className="ellipse"/>
          <div className="login-box">
            <div className="login-box-content">
              <h2>Entrar</h2>
              <form>
                <div className="form-group">
                  <label htmlFor="username">e-mail</label>
                  <input type="text" id="username" name="username" placeholder="email@email.com" />
                </div>
                <div className="form-group">
                  <label htmlFor="password">senha</label>
                  <input type="password" id="password" name="password" placeholder="************" />
                </div>
                <div className="buttons">
                  <div className="button-container">
                    <button type="submit">LOGIN</button>
                  </div>
                  <div className="button-container">
                    <button type="button">Recuperar senha</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </body>
  );
}

export default Login;
