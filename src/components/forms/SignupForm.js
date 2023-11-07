import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as yup from "yup";
import elipse6 from '../../assets/elipse6.svg';
import { getLotacoes } from "../../services/lotacaoService";
import { getPoliceUnits } from "../../services/policeUnitService";
import { createUser } from "../../services/userService";
import "../../style/components/signupForms.css";


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
    const [lotacaoInList, setLotacaoInList] = useState([]);
    const [policieUnit, setPolicieUnit] = useState([]);
    const [displayLotacoes, setDisplayLotacoes] = useState(false);

    useEffect( () => {
        async function setData() {
            try {
                const [dataLotacao, dataPolicieUnit] = await Promise.all([
                    getLotacoes(),
                    getPoliceUnits()
                ])
                if (dataLotacao.type ==='success' && dataLotacao.data) {
                    setLotacao(dataLotacao.data);
                }
                if (dataPolicieUnit.type ==='success' && dataPolicieUnit.data) {
                    setPolicieUnit(dataPolicieUnit.data);
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
        formState: { errors, isValid }, 
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
            reset()
        } else {
            toast.error("Erro ao cadastrar usuario")
        }
    }

    const handlePoliceUnitChange = (event) => {
        if(event.target.value) {
            setDisplayLotacoes(true);
            setLotacaoInList(lotacao.filter(lot => lot.unidade_pai_id === event.target.value))
        }else {
            setDisplayLotacoes(false);
        }
    };


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
                            <span data-testid="email-error">{errors.emailConfirmar?.message}</span>
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
                            <label>Unidade de Policia<span>*</span></label>
                            <select onChange={handlePoliceUnitChange}>
                                <option value="">Selecione a Unidade de policia</option>
                                {policieUnit?.map((unit) => (
                                <option key={unit.id} value={unit.id}>
                                    {unit.nome}
                                </option>
                                ))}
                            </select>
                        </div>
                        {displayLotacoes && (
                            <div id="input-box">
                                <label>Lotação Relacionadas <span>*</span></label>
                                <select {...register("lotacao_id", {required: "Lotação é obrigatória"})}>
                                    <option value="">Selecione a Lotação</option>
                                    {lotacaoInList?.map((lotacao) => (
                                    <option key={lotacao.id} value={lotacao.id}>
                                        {lotacao.nome}
                                    </option>
                                    ))}
                                </select>
                                <span>{errors.lotacao_id?.message}</span>
                            </div>
                        )}
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
                    <button className="form-button" type="button" id="cancel-bnt" >CANCELAR</button>
                    <button className="form-button" type="submit" id="register-bnt" disabled={!isValid}>REGISTRAR</button>
                </div>
            </form>
            <div className="elipse-signup">
                <img alt= "elipse"  src={elipse6}></img>
            </div>
            <ToastContainer />
        </div>
    );
}