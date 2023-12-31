import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as yup from "yup";
import { forgottenPassword } from "../../services/userService";
import "../../style/components/forgottenPasswordForms.css";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useNavigate } from 'react-router-dom';



const forgottenPasswordSchema = yup.object().shape({
    email: yup
      .string()
      .email('Email inválido')
      .required('Email é obrigatório')
  });

export default function ForgottenPasswordForm(){
    const navigate = useNavigate();
    
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting, isValid },
    } = useForm({resolver: yupResolver(forgottenPasswordSchema), mode: "onChange"})

    const onSubmit = async (data) =>  {
        const response = await forgottenPassword(data);
        if(response.type === 'success') {
            toast.success("Email enviado com sucesso!")
            setTimeout(() => {
                navigate('/');
            }, 3000); 
        } else {
            toast.error("Ocorreu um erro ao enviar o email! Tente novamente")
        }
    }

    return(
        <div id="forgotpassword-card">
            <header id="forgotpassword-form-header">
                Esqueci minha senha
            </header>
            <p id="forgotpassword-description">
                Para redefinir sua senha, informe o email cadastrado na sua conta e lhe enviaremos um link de recuperação.<span></span>
            </p>
            <form id="forgotpassword-form"onSubmit={handleSubmit(onSubmit)}>
                <div id="forgotpassword-input-group">
                    <div id="forgotpassword-input-box">
                        <label htmlFor="emailCadastrado">Email Cadastrado</label>
                        <input id="email" {...register("email", {required: true} )} type="email" placeholder="Email" />
                        <span>{errors.email?.message}</span>
                    </div>
                </div>

                <div id="forgotpassword-buttons">
                    <button className="forgotpassword-form-button" type="submit" id="forgotpassword-register-bnt" disabled={isSubmitting || !isValid}>
                        {isSubmitting && (
                            <ReloadIcon id="animate-spin"/>
                        )}

                        {isSubmitting ? 'Enviando': "Confirmar"}
                    </button>
                </div>
            </form>   
        </div>
    );
}