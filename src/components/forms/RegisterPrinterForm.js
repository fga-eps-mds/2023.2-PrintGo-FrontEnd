import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { getLotacoes, createUser } from "../../api/api";
import "../../style/components/registerPrinterForms.css";
import elipse6 from '../../assets/elipse6.svg';


const registerPrinterSchema = yup.object().shape({
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

export default function RegisterPrinterForm(){
    const [lotacao, setLotacao] = useState([]);

    useEffect( () => {
        async function setLotacoes() {
            try {
                const data = await getLotacoes();
                if (data.type ==='success' && data.data) {
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
    } = useForm({resolver: yupResolver(registerPrinterSchema), mode: "onChange"})

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
                Cadastrar impressora
            </header>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div id="input-group">
                    <div id="input-line">
                        <div id="input-box">
                            <label>Padrão<span>*</span></label>
                            <input {...register("padrao", {required: true} )} placeholder="Padrão" />
                            <span>{errors.padrao?.message}</span>
                        </div>

                        <div id="input-box">
                            <label>IP<span>*</span></label>
                            <input {...register("ip", {required: true})} placeholder="123.456.789.123" />
                            <span>{errors.ip?.message}</span>
                        </div>
                    </div>
                    <div id="input-line">
                        <div id="input-box">
                            <label>Número de série<span>*</span></label>
                            <input {...register("numeroSerie", {required: true} )} placeholder="XXXX-000000" />
                            <span>{errors.numeroSerie?.message}</span>
                        </div>

                        <div id="input-box">
                            <label>Código da locadora<span>*</span></label>
                            <input {...register("codigoLocadora", {required: true})} placeholder="Código da Locadora" />
                            <span>{errors.codigoLocadora?.message}</span>
                        </div>
                    </div>
                    <div id="input-line">
                        <div id="input-box">
                            <label>Contador de instalação<span>*</span></label>
                            <input {...register("contadorInstalacao", {required: true})} placeholder="Contador de instalação"/>
                            <span>{errors.contadorInstalacao?.message}</span>
                        </div>
                        <div id="input-box">
                            <label>Data de instalação<span>*</span></label>
                            <input {...register("dataInstalacao", {required: true})} placeholder="dd/mm/aaaa"/>
                            <span>{errors.dataInstalacao?.message}</span>
                        </div>
                    </div>
                    <div id="input-line">
                        <div id="input-box">
                            <label>Contador de retirada<span>*</span></label>
                            <input {...register("contadorRetirada", {required: true})} placeholder="Contador de retirada"/>
                            <span>{errors.contadorRetirada?.message}</span>
                        </div>
                        <div id="input-box">
                            <label>Data de retirada<span>*</span></label>
                            <input {...register("dataRetirada", {required: true})} placeholder="dd/mm/aaaa"/>
                            <span>{errors.dataRetirada?.message}</span>
                        </div>
                    </div>
                    <div id="input-line">
                        <div id="input-box">
                            <label>Último contador<span>*</span></label>
                            <input {...register("ultimoContador", {required: true})} placeholder="Último contador"/>
                            <span>{errors.ultimoContador?.message}</span>
                        </div>
                        <div id="input-box">
                            <label>Data do último contador<span>*</span></label>
                            <input {...register("dataUltimoContador", {required: true})} placeholder="dd/mm/aaaa"/>
                            <span>{errors.dataUltimoContador?.message}</span>
                        </div>
                    </div>
                    <div id="input-line">
                        <div id="input-box">
                            <label>Unidade pai<span>*</span></label>
                            <input {...register("unidadePai", {required: true})} placeholder="Unidade pai"/>
                            <span>{errors.unidadePai?.message}</span>
                        </div>
                        <div id="input-box">
                            <label>Unidade filho<span>*</span></label>
                            <input {...register("unidadeFilho", {required: true})} placeholder="Unidade filho"/>
                            <span>{errors.unidadeFilho?.message}</span>
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