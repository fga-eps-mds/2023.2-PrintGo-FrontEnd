import React from "react";
import '../style/pages/changePassword.css';
import people from '../assets/people.png';
import elipse6 from '../assets/elipse6.png';

export default function ChangePassword() {
    return (
        <div className="change-password-container">
            <div className="image-container">
                <img src={people} alt="Pessoas"/>
            </div>
            <div className="form-container">
                <form className="form">
                    <div className="input-container">
                        <div className="form-title">Mudar senha</div>
                        <div className="form-group">
                            <div className="input-form-container">
                                <label>Nova Senha</label>
                                <input 
                                    type="password"
                                />
                            </div>
                            <div className="input-form-container">
                                <label>Repita a senha</label>
                                <input 
                                    type="password"
                                />
                            </div>
                        </div>
                        <div className="button-container">
                            <input type="submit" value="Confirmar" className="button"/>
                            
                        </div>

                        
                    </div>
                </form>

                <div className="elipse">
                    <img src={elipse6}></img>
                </div>
            </div>
        </div>
    )
}