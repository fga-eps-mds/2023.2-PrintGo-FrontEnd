import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { getLotacoes, createUser } from "../../api/api";
import "../../style/components/signupForms.css";
import elipse6 from '../../assets/elipse6.svg';


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
    senha: yup.string().required('Senha é obrigatória')
    .matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'A senha não segue o padrão a baixo'
    ),
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
                if (data.type ==='success') {
                    setLotacao(data.data);
                }
            } catch (error) {
                console.error('Erro ao obter opções do serviço:', error);
              }
        }
        setLotacoes();
      }, []);
   
    
    const {
        register,
        handleSubmit,
        formState: { errors, isValid }, 
        reset
    } = useForm({resolver: yupResolver(signupSchema), mode: "onChange"})

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
                            <input {...register("documento", {required: true})} placeholder="CPF ou CNPF" />
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
                            <p id="input-description">A senha deve conter pelo menos 8 caracteres, 1 letra maiúscula, 1 minuscula, 1 número e um caractere especial</p>
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
                                    id="checkbox"
                                    type="checkbox"
                                    {...register("isAdmin")}
                                />
                                <label id="label-checkbox">Usuário é administrador?</label>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="buttons">
                    <button className="form-button" type="button" id="cancelar-bnt" >CANCELAR</button>
                    <button className="form-button" type="submit" id="registrar-bnt" disabled={!isValid}>REGISTRAR</button>
                </div>
            </form>
            <div className="elipse-signup">
                <img alt= "elipse"  src={elipse6}></img>
            </div>
        </div>
    );
}