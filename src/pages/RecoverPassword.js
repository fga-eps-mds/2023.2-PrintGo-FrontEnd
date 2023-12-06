import React from "react";
import "../style/pages/changePassword.css";
import ChangePasswordPeople from "../assets/change-password-people.svg";
import elipse6 from "../assets/elipse6.svg";
import Navbar from "../components/navbar/Navbar";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { ReloadIcon } from "@radix-ui/react-icons";
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';
import { recoverPassword } from "../services/userService";
import { getPasswordSchema } from "../components/utils/YupSchema";

const passwordSchema = getPasswordSchema();

export default function RecoverPasswordPage() {
  const navigate = useNavigate();
  const location = useLocation()
  const params = new URLSearchParams(location.search)

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting }, 
    reset
  } = useForm({resolver: yupResolver(passwordSchema), mode: "onChange"})
  
  const submitChangePassword = async (data) => {
    const token = params.get("token");
    const response = await recoverPassword({token, senha: data.novaSenha});
    if (response.type === 'error') {
      toast.error("Ocorreu um erro na atualização da senha! por favor tente novamente");
    } else {
      toast.success("Senha alterada com sucesso! redirecionando");
      setTimeout(() => {
        reset();
        navigate('/login');
      }, 3000); 
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
          <form className="change-password-form" onSubmit={handleSubmit(submitChangePassword)}>
            <div className="change-password-input-container">
              <div className="change-password-form-title">Mudar senha</div>
              <div className="change-password-form-group">
                <div className="input-form-container">
                  <label htmlFor="label-change-password" className="label-change-password">Nova Senha</label>
                  <input
                    {...register("novaSenha", {required: true} )}
                    type="password"
                    placeholder="*********"
                    className="input-field"
                  />
                  <span>{errors.novaSenha?.message}</span>
                </div>
                <div className="input-form-container">
                  <label htmlFor="label-change-password" className="label-change-password">
                    Repita a senha
                  </label>
                  <input
                    type="password"
                    {...register("confirmacaoNovaSenha", {required: true} )}
                    placeholder="*********"
                    className="input-field"
                  />
                  <span>{errors.confirmacaoNovaSenha?.message}</span>
                </div>
              </div>
              <div className="change-password-button-container">
                <button
                  type="submit"
                  disabled={!isValid || isSubmitting}
                >
                  {isSubmitting && (
                            <ReloadIcon id="animate-spin"/>
                  )}
                  Confirmar
                </button>
              </div>
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
