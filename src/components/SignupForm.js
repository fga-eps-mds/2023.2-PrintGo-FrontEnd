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
        <div>      
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                <input {...register("nome")} placeholder="Nome" />
                </div>
                <div>
                <input {...register("email")} placeholder="Email" />
                </div>
                <div><input {...register("emailCofirmar")} placeholder="Confirmar Email" /></div>
                <div><input {...register("senha")} placeholder="Senha" type="password"/></div>
                <div><input {...register("senhaConfirmar")} placeholder="Confirmar Senha" type="password"/></div>
                <div><input {...register("documento")} placeholder="CPF ou CNPF" /></div>
                <div><input {...register("password")} placeholder="Senha" /></div>
                <div><input {...register("lotacao_id")} placeholder="Lotacao" /></div>
                <div><input {...register("cargos")} placeholder="Cargo" /></div>
                <div>
                    <button type="button">CANCELAR</button>
                    <button type="submit">REGISTAR</button>
                </div>
            </form>
        </div>
    );
}