import React, { useState } from "react";
import "../style/pages/changePassword.css";
import ChangePasswordPeople from "../assets/change-password-people.svg";
import elipse6 from "../assets/elipse6.svg";
import { changePassword } from "../api/api";
import Navbar from "../components/navbar/Navbar";

export default function ChangePassword() {
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [passwordError, setPasswordError] = useState(null);
  const [passwordConfirmationError, setPasswordConfirmationError] = useState(null);
  const [success, setSuccess] = useState(false);

  function isValidPassword(password) {
    const trimmedPassword = password.trim()
    return trimmedPassword === ''
  }

  const handlePasswordChange = (e) => {
    if(!isValidPassword(e.target.value)){
      setPasswordError("Senha inválida")
    } else {
      setPasswordError(null)
    }

    setPassword(e.target.value)
  }

  const handlePasswordConfirmationChange = (e) => {
    if(!isValidPassword(e.target.value)){
      setPasswordConfirmationError("Confirmação de Senha inválida")
    } else {
      setPasswordConfirmationError(null)
    }

    setPasswordConfirmation(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await changePassword(password, passwordConfirmation);

      if (response) {
        setSuccess(true);
        setPassword("");
        setPasswordConfirmation("");
      }
    } catch (error) {
      console.log(error);
      setPasswordError("Erro ao trocar de senha");
    }
  };

  return (
    <>
      <Navbar />
      <div className="change-password-container">
        <div className="change-password-image-container">
          <img src={ChangePasswordPeople} alt="Pessoas" />
        </div>
        <div className="change-password-form-container">
          <form className="change-password-form" onSubmit={handleSubmit}>
            <div className="change-password-input-container">
              <div className="change-password-form-title">Mudar senha</div>
              <div className="change-password-form-group">
                <div className="input-form-container">
                  <label htmlFor="label-change-password" className="label-change-password">Nova Senha</label>
                  <input
                    type="password"
                    name="password"
                    placeholder="*****************"
                    className="input-field"
                    value={password}
                    onChange={handlePasswordChange}
                  />
                </div>
                <div className="input-form-container">
                  <label htmlFor="label-change-password" className="label-change-password">
                    Repita a senha
                  </label>
                  <input
                    type="password"
                    name="passwordConfirmation"
                    placeholder="******************"
                    className="input-field"
                    value={passwordConfirmation}
                    onChange={handlePasswordConfirmationChange}
                  />
                </div>
              </div>
              <div className="change-password-button-container">
                <button
                  type="submit"
                >
                  Confirmar
                </button>
              </div>
              {passwordError && <h5 style={{ color: "red" }}>{passwordError}</h5>}
              {passwordConfirmationError && <h5 style={{ color: "red" }}>{passwordConfirmationError}</h5>}
              {success && <h5 style={{ color: "green" }}>Senha atualizada!</h5>}
            </div>
          </form>

          <div className="elipse-change-pass">
            <img src={elipse6} alt="elipse_azul"></img>
          </div>
        </div>
      </div>
    </>
  );
}
