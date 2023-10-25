import React,{ useState } from "react";
import '../style/pages/changePassword.css';
import ChangePasswordPeople from '../assets/change-password-people.svg';
import elipse6 from '../assets/elipse6.svg';
import { changePassword } from "../api/api";

export default function ChangePassword() {
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          const response = await changePassword(password, passwordConfirmation);
        
            if(response) {
               setSuccess(true)
               setPassword('')
               setPasswordConfirmation('') 
            }
        } catch (error) {
          console.log(error);
          setError('Erro ao trocar de senha');
        }
    }

    return (
        <div className="change-password-container">
            <div className="image-container">
                <img src={ChangePasswordPeople} alt="Pessoas"/>
            </div>
            <div className="form-container">
                <form className="form" onSubmit={handleSubmit}>
                    <div className="input-container">
                        <div className="form-title">Mudar senha</div>
                        <div className="form-group">
                            <div className="input-form-container">
                                <label className="label-change-password">Nova Senha</label>
                                <input 
                                    type="password"
                                    name="password"
                                    placeholder="*****************"
                                    className="input-field"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                />
                            </div>
                            <div className="input-form-container">
                                <label className="label-change-password">Repita a senha</label>
                                <input 
                                    type="password"
                                    name="passwordConfirmation"
                                    placeholder="*****************"
                                    className="input-field"
                                    value={passwordConfirmation}
                                    onChange={e => setPasswordConfirmation(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="button-container">
                            <input type="submit" value="Confirmar" className="button"/>
                        </div>
                        {error && <h5 style={{color: 'red'}}>{error}</h5>}
                        {success && <h5 style={{color: 'green'}}>Senha atualizada!</h5>}
                    </div>
                </form>

                <div className="elipse-change-pass">
                    <img src={elipse6}></img>
                </div>
            </div>
        </div>
    )
}