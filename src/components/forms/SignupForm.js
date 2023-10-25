import React, { useEffect, useState } from "react";
import "../../style/components/signupForm.css"
import { useForm } from "react-hook-form";
import { getLotacoes } from "../../services/lotacaoService";
import { yupResolver } from "@hookform/resolvers/yup";
import { createUser } from "../../services/userService";
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
      .required('Email é obrigatória'),
    senha: yup.string().required('Senha é obrigatória'),
    senhaConfirmar: yup
      .string()
      .oneOf([yup.ref('senha'), null], 'As senhas devem coincidir')
      .required('Senha é obrigatória'),
    documento: yup.string()
    .matches(/^(\d{11}|\d{14})$/, 'CPF ou CNPJ inválido')
    .test('cpfOrCnpj', 'CPF ou CNPJ inválido', value => {
        return value.length === 11 || value.length === 14;
    }),
    lotacao_id: yup.string().required('Lotação é obrigatória'),
    isAdmin: yup.boolean(),
  });

export default function SignupForm(){
    const [lotacao, setLotacao] = useState([]);

    useEffect( () => {
        async function setLotacoes() {
            try {
                const data = await getLotacoes();
                setLotacao(data);
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
        await createUser(data);
        reset()
    }

    return(
        <div id="signup-card">
            <header id="form-header">
                Cadastro
            </header>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div id="input-group">
                    <div id="input-line">
                        <div id="input-box">
                            <label>Nome<span>*</span></label>
                            <input {...register("nome", {required: true} )} placeholder="Nome" />
                            <span>{errors.nome?.message}</span>
                        </div>

                        <div id="input-box">
                            <label>Documento<span>*</span></label>
                            <input {...register("documento", {required: true})} type="number" placeholder="CPF ou CNPF" />
                            <span>{errors.documento?.message}</span>
                        </div>
                    </div>
                    <div id="input-line">
                        <div id="input-box">
                            <label>E-mail<span>*</span></label>
                            <input {...register("email", {required: true} )} type="email" placeholder="Email" />
                            <span>{errors.email?.message}</span>
                        </div>

                        <div id="input-box">
                            <label>Confirmar E-mail<span>*</span></label>
                            <input {...register("emailConfirmar", {required: true})} placeholder="Confirmar Email" />
                            <span>{errors.emailConfirmar?.message}</span>
                        </div>
                    </div>

                    <div id="input-line">
                        <div id="input-box">
                            <label>Senha<span>*</span></label>
                            <input {...register("senha", {required: true})} placeholder="Senha" type="password"/>
                            <span>{errors.senha?.message}</span>
                            <p id="input-description">A senha deve conter 1 letra maiuscula, 1 minuscula, 1 numero e um caractere especial</p>
                        </div>
                        <div id="input-box">
                            <label>Confirmar Senha<span>*</span></label>
                            <input {...register("senhaConfirmar", {required: true})} placeholder="Confirmar Senha" type="password"/>
                            <span>{errors.senhaConfirmar?.message}</span>
                        </div>
                    </div>
                    <div id="input-line">
                        <div id="input-box">
                            <label>Lotação <span>*</span></label>
                            <select {...register("lotacao_id", {required: "Lotação é obrigatória"})}>
                                <option value="">Selecione a Lotação</option>
                                {lotacao?.map((lotacao) => (
                                <option key={lotacao.id} value={lotacao.id}>
                                    {lotacao.nome}
                                </option>
                                ))}
                            </select>
                            <span>{errors.lotacao_id?.message}</span>
                        </div>
                    </div>
                    <div id="input-line">
                        <div id="input-box">
                            <div id="input-checkbox">
                                <input
                                    type="checkbox"
                                    {...register("isAdmin")}
                                />
                                <label>Usuário é administrador?</label>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="buttons">
                    <button className="form-button" type="button" id="cancelar-bnt">CANCELAR</button>
                    <button className="form-button" type="submit" id="registrar-bnt">REGISTRAR</button>
                </div>
            </form>
        </div>
    );
}