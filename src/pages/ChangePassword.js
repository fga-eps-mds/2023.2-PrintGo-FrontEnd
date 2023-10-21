import React from "react";
import '../style/pages/changePassword.css';
import people from '../assets/people.png';
import elipse6 from '../assets/elipse6.png';

export default function ChangePassword() {
    return (
        <div className="change-password-page">
            <div className="people">
                <img src={people} alt="Pessoas" />
            </div>
            <div className="change-password-box">
                <div className="password-box">
                    <div className="password-box-content">
                        <div className="form-title">Mudar Senha</div>
                        <form className="password-form">
                            <div className="queijo">
                                
                            </div>
                            <div className="pedro">
                                
                            </div>
                            <div className="botao">
                                <button type="submit">Mudar senha</button>
                            </div>
                        </form>
                    </div>
                </div>
                <img src={elipse6} alt="Elipse" className="elipse"/>
            </div>
        </div>
    )
}