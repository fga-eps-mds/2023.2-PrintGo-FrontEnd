import React, { useEffect, useState } from "react";
import "../style/components/signupform.css"
import { useForm } from "react-hook-form";
import { getLotacoes } from "../services/lotacaoService";
import { yupResolver } from "@hookform/resolvers/yup";
import { createUser } from "../services/userService";
import * as yup from "yup";

const signupSchema = yup.object().shape({
    nome: yup.string().required('Nome é obrigatório'),
    email: yup
      .string()
      .email('Email inválido')
      .required('Email é obrigatório'),
    emailConfirmar: yup
      .string()
      .oneOf([yup.ref('email'), null], 'Os emails devem coincidir')
      .required('Confirmação de email é obrigatória'),
    senha: yup.string().required('Senha é obrigatória'),
    senhaConfirmar: yup
      .string()
      .oneOf([yup.ref('senha'), null], 'As senhas devem coincidir')
      .required('Confirmação de senha é obrigatória'),
    documento: yup.string().required('CPF ou CNPF é obrigatório'),
    lotacao_id: yup.string().required('Lotação é obrigatória'),
    isAdmin: yup.boolean(),
  });

export default function SignupForm(){
    const [lotacao, setLotacao] = useState([]);
    const [isLotacaoLoaded, setIsLotacaoLoaded] = useState(false);

    useEffect( () => {
        async function setLotacoes() {
            try {
                const data = await getLotacoes();
                setLotacao(data);
                setIsLotacaoLoaded(true);
            } catch (error) {
                console.error('Erro ao obter opções do serviço:', error);
              }
        }
        setLotacoes();
      }, []);
    
    const {
        register,
        handleSubmit,
        formState: { errors }, 
        reset
    } = useForm({resolver: yupResolver(signupSchema)})

    const onSubmit = async (data) =>  {
        data.cargos = ["USER"];
        if (data.isAdmin) {
            data.cargos.push("ADMIN");
        }
        const response = await createUser(data);
        reset()
    }

    return(
        <div class="signup-container">
            <header class="form-header">
                Cadastro
            </header>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div class="input-group">
                    <div class="input-box">
                        <input {...register("nome", {required: true} )} placeholder="Nome" />
                        <span>{errors.nome?.message}</span>
                    </div>

                    <div class="input-box">
                        <p>Documento</p>
                        <input {...register("documento", {required: true})} placeholder="CPF ou CNPF" />
                    </div>

                    <div class="input-box">
                        <p>E-mail</p>
                        <input {...register("email", {required: true} )} type="email" placeholder="Email" />
                        <span>{errors.email?.message}</span>
                    </div>

                    <div class="input-box">
                        <p>Confirmar E-mail</p>
                        <input {...register("emailConfirmar", {required: true})} placeholder="Confirmar Email" />
                        <span>{errors.emailConfirmar?.message}</span>
                    </div>

                    <div class="input-box">
                        <p>Senha</p>
                        <input {...register("senha", {required: true})} placeholder="Senha" type="password"/>
                        <span>{errors.senha?.message}</span>
                    </div>

                    <div class="input-box">
                        <p>Confirmar Senha</p>
                        <input {...register("senhaConfirmar", {required: true})} placeholder="Confirmar Senha" type="password"/>
                        <span>{errors.senhaConfirmar?.message}</span>
                    </div>

                    <div class="input-box">
                        <p>Lotação</p>
                        <select {...register("lotacao_id", {required: "Lotação é obrigatória"})}>
                            <option value="">Selecione a Lotação</option>
                            {lotacao.map((lotacao) => (
                            <option key={lotacao.id} value={lotacao.id}>
                                {lotacao.nome}
                            </option>
                            ))}
                        </select>
                        <span>{errors.lotacao_id?.message}</span>
                    </div>

                    <div class="input-box">
                        <p>Cargo</p>
                        <input
                            type="checkbox"
                            {...register("isAdmin")}
                        />
                        <p>Usuário é administrador?</p>
                        <span>{errors.cargos?.message}</span>
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