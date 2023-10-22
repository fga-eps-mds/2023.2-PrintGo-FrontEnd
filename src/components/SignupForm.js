import "../style/components/signupform.css"
import React from "react";
import { useForm } from "react-hook-form";

export default function SignupForm(){
    const {
        register,
        handleSubmit,
    } = useForm()

    const onSubmit = (data) => {
        console.log(data)
    }

    return(
        <div class="signup-container">
            <header class="form-header">
                Cadastro
            </header>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div class="input-group">
                    <div class="input-box">
                        <p>Nome</p>
                        <input {...register("nome")} placeholder="Nome" />
                    </div>

                    <div class="input-box">
                        <p>Documento</p>
                        <input {...register("documento")} placeholder="CPF ou CNPF" />
                    </div>

                    <div class="input-box">
                        <p>E-mail</p>
                        <input {...register("email")} placeholder="Email" />
                    </div>

                    <div class="input-box">
                        <p>Confirmar E-mail</p>
                        <input {...register("emailConfirmar")} placeholder="Confirmar Email" />
                    </div>

                    <div class="input-box">
                        <p>Senha</p>
                        <input {...register("senha")} placeholder="Senha" type="password"/>
                    </div>

                    <div class="input-box">
                        <p>Confirmar Senha</p>
                        <input {...register("senhaConfirmar")} placeholder="Confirmar Senha" type="password"/>
                    </div>

                    <div class="input-box">
                        <p>Lotação</p>
                        <input {...register("lotacao_id")} placeholder="Lotacao" />
                    </div>

                    <div class="input-box">
                        <p>Cargo</p>
                        <input {...register("cargos")} placeholder="Cargo" />
                    </div>

                </div>

                <div class="buttons">
                    <button type="button" class="cancelar-bnt">Cancelar</button>
                    <button type="submit" class="registrar-bnt">REGISTRAR</button>
                </div>
            </form>
        </div>
    );
}