import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as yup from "yup";
import { getUnidades } from "../../services/unidadeService";
import { createUser } from "../../services/userService";
import "../../style/components/signupForms.css";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useNavigate } from 'react-router-dom';



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
    unidade_id: yup.string().required('Lotação é obrigatória'),
    isAdmin: yup.boolean(),
  });

export default function SignupForm(){
    const navigate = useNavigate();

    const [unidade, setUnidade] = useState([]);
    const [unidadeInList, setUnidadeInList] = useState([]);
    const [displayLotacoes, setDisplayLotacoes] = useState(false);

    useEffect( () => {
        async function setData() {
            try {
                const dataUnidades = await getUnidades();
                
                if (dataUnidades.type ==='success' && dataUnidades.data) {
                    setUnidade(dataUnidades.data);
                }

            } catch (error) {
                console.error('Erro ao obter opções do serviço:', error);
              }
        }
        setData();
      }, []);
   
    
    const {
        register,
        handleSubmit,
        formState: { errors, isValid, isSubmitting }, 
        reset
    } = useForm({resolver: yupResolver(signupSchema), mode: "onChange"})

    const onSubmit = async (data) =>  {

        data.cargos = ["USER"];
        if (data.isAdmin) {
            data.cargos.push("ADMIN");
        }
        const response = await createUser(data);
        if(response.type === 'success'){
            toast.success("Usuario cadastrado com sucesso!")
            setTimeout(() => {
                reset();
                navigate('/');
            }, 3000); 
        } else {
            toast.error("Erro ao cadastrar usuario")
        }
    }

    const handleWorkstationChange = (event) => {

        if(event.target.value) {
            const listChildWorkstations = unidade.find(uni => uni.id === event.target.value).child_workstations;
            setDisplayLotacoes(true);
            setUnidadeInList(listChildWorkstations);
        }else {
            setDisplayLotacoes(false);
        }
    };


    return(
        <div id="signup-card">
            <div id="form-header">
                Cadastro
            </div>
            <form id="signup-form"onSubmit={handleSubmit(onSubmit)}>
                <div id="signup-input-group">
                    <div id="signup-input-line">
                        <div id="signup-input-box">
                            <label htmlFor="nome">Nome<span>*</span></label>
                            <input id="nome" {...register("nome", {required: true} )} placeholder="Nome" />
                            <span>{errors.nome?.message}</span>
                        </div>

                        <div id="signup-input-box">
                            <label htmlFor="documento">Documento<span>*</span></label>
                            <input id="documento" {...register("documento", {required: true})} placeholder="CPF ou CNPJ" />
                            <span>{errors.documento?.message}</span>
                        </div>
                    </div>
                    <div id="signup-input-line">
                        <div id="signup-input-box">
                            <label htmlFor="email">E-mail<span>*</span></label>
                            <input id="email" {...register("email", {required: true} )} type="email" placeholder="Email" />
                            <span>{errors.email?.message}</span>
                        </div>

                        <div id="signup-input-box">
                            <label htmlFor="confirmarEmail" >Confirmar E-mail<span>*</span></label>
                            <input id="confirmarEmail" {...register("emailConfirmar", {required: true})} placeholder="Confirmar Email" />
                            <span data-testid="email-error">{errors.emailConfirmar?.message}</span>
                        </div>
                    </div>

                    <div id="signup-input-line">
                        <div id="signup-input-box">
                            <label htmlFor="senha" >Senha<span>*</span></label>
                            <input id="senha" {...register("senha", {required: true})} placeholder="Senha" type="password"/>
                            <span>{errors.senha?.message}</span>
                            <p id="input-description">A senha deve conter pelo menos 8 caracteres, 1 letra maiúscula, 1 minuscula, 1 número e um caractere especial</p>
                        </div>
                        <div id="signup-input-box">
                            <label htmlFor="confirmarSenha" >Confirmar Senha<span>*</span></label>
                            <input id="confirmarSenha" {...register("senhaConfirmar", {required: true})} placeholder="Confirmar Senha" type="password"/>
                            <span>{errors.senhaConfirmar?.message}</span>
                        </div>
                    </div>
                    <div id="signup-input-line">
                        <div id="signup-input-box">
                            <label htmlFor="unidadePai">Unidade pai<span>*</span></label>
                            <select onChange={handleWorkstationChange}>
                                <option value="">Selecione a Unidade de policia</option>
                                {unidade?.map((unit) => (
                                <option key={unit.id} value={unit.id}>
                                    {unit.name}
                                </option>
                                ))}
                            </select>
                        </div>
                        <div id="signup-input-box">
                          {displayLotacoes && (
                            <>
                              <label htmlFor="unidadeFilha">Unidade Filha<span>*</span></label>
                              <select {...register("unidade_id", {required: "Lotação é obrigatória"})}>
                                  <option value="">Selecione a Lotação</option>
                                  {unidadeInList?.map((unidade) => (
                                  <option key={unidade.id} value={unidade.id}>
                                      {unidade.name}
                                  </option>
                                  ))}
                              </select>
                              <span>{errors.unidade_id?.message}</span>
                            </>
                          )}
                        </div>
                    </div>
                    <div id="signup-input-line">
                        <div id="signup-input-box">
                            <div id="signup-input-checkbox">
                                <input
                                    id="checkbox"
                                    type="checkbox"
                                    {...register("isAdmin")}
                                />
                                <label htmlFor="label-checkbox" id="label-checkbox">Usuário é administrador?</label>
                            </div>
                        </div>
                        <div id="signup-input-box"></div>
                    </div>
                </div>

                <div id="signup-buttons">
                    <button className="form-button" type="button" id="cancel-bnt" >CANCELAR</button>
                    <button className="form-button" type="submit" id="register-bnt" disabled={!isValid || isSubmitting}>
                        {isSubmitting && (
                            <ReloadIcon id="animate-spin"/>
                        )}

                        {!isSubmitting ? 'REGISTRAR': "CADASTRANDO"}
                    </button>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
}
