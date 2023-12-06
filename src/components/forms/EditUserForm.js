import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as yup from "yup";
import { getUnidades } from "../../services/unidadeService";
import { getUserById, updateUser } from "../../services/userService";
import "../../style/components/editUserForms.css";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Link, useNavigate } from 'react-router-dom';
import { decodeToken } from "react-jwt";


const editUserSchema = yup.object().shape({
  nome: yup.string().required('Nome é obrigatório'),
  email: yup
    .string()
    .email('Email inválido')
    .required('Email é obrigatório'),
  emailConfirmar: yup
    .string()
    .oneOf([yup.ref('email'), null], 'Os emails devem coincidir')
    .required('Email é obrigatória'),
  documento: yup.string()
  .matches(/^(\d{11}|\d{14})$/, 'CPF ou CNPJ inválido')
  .test('cpfOrCnpj', 'CPF ou CNPJ inválido', value => {
      return value.length === 11 || value.length === 14;
  }),
  unidade_id: yup.string().required('Lotação é obrigatória'),
  unidade_pai: yup.string().strip(),
});

export default function EditUserForm(){

  let loggedUser = null;
  const token = localStorage.getItem("jwt");
  if (token) {
    loggedUser = decodeToken(token);
  }

  const [unidadeList, setUnidadeList] = useState();
  const [displayLotacoes,setDisplayLotacoes] = useState ('');
  const [unidadeFilhoList, setUnidadeFilhoList] = useState ();
  const [userData, setUserData] = useState(null);

  const memoUserData = useMemo(() => userData, [userData]);
  const memoUnidadeList = useMemo(() => unidadeList, [unidadeList]);

  const navigate = useNavigate();


  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors, isValid, isSubmitting }, 
    reset
  } = useForm({resolver: yupResolver(editUserSchema), mode: "onChange"})


  // Puxe os dados do usuário logado.
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await getUserById(loggedUser.id);
        
        console.log(data);
        if (data) {
          setUserData(data);
        }
      } catch(error) {
        console.log('Erro ao buscar dados do usuário:', error);
      }
    }
    if(loggedUser && !userData) {
      fetchUserData();
    }
  }, [loggedUser])

  // Puxe os dados das unidades policiais.
  useEffect( () => {
    async function fetchWorkStationData() {
      try {
        const dataUnidades = await getUnidades();
        
        if (dataUnidades.type ==='success' && dataUnidades.data) {
          setUnidadeList(dataUnidades.data);
        }

      } catch (error) {
        console.error('Erro ao obter opções do serviço:', error);
      }
    }
    fetchWorkStationData();
  }, []);

  
  useEffect(() => {
    if (memoUserData && memoUnidadeList && unidadeList) {
      console.log(unidadeList);
      
      Object.keys(userData).forEach((key) => {
        setValue(key, userData[key] || "");
      })
      
      const unidadeFilha = unidadeList.find(unidade => unidade.id === userData.unidade_id);
      
      if (unidadeFilha) {
        const unidadePai = unidadeFilha.parent_workstation;
        setValue("unidade_pai", unidadePai.id);

        const listChildWorkstations = unidadeList.find(unidade => unidade.id === unidadePai.id).child_workstations;
        setUnidadeFilhoList(listChildWorkstations);
        setDisplayLotacoes(true);
      }
    }
  }, [memoUserData, memoUnidadeList, setValue]);
  
  const onSubmit = async (data) =>  {

    setTimeout(() => {
      console.log("3 segundos se passaram.");
    }, 3000);  // 3000 milissegundos = 3 segundos
    
    delete data["emailConfirmar"];
    delete data["unidade_pai"];

    const response = await updateUser(data, data.id);
    if(response.type === 'success'){
      toast.success("Usuario atualizado com sucesso!");
      reset()
    } else {
      toast.error("Erro ao atualizar usuário");
    }
  }

  const handleWorkstationChange = (event) => {

    if(event.target.value && unidadeList) {
      const listChildWorkstations = unidadeList.find(uni => uni.id === event.target.value).child_workstations;
      setDisplayLotacoes(true);
      setUnidadeFilhoList(listChildWorkstations);
    }else {
      setDisplayLotacoes(false);
    }
  };

  const redirectToChangePassword = () => {
    navigate('/mudarsenha'); 
  };

  return(
    <div id="edit-user-card">
      <header id="edit-user-form-header">
        Editar usuário
      </header>
      <form id="edit-user-form" onSubmit={handleSubmit(onSubmit)}>
        <div id="edit-user-input-group">
          <div id="edit-user-input-line">
              <div id="edit-user-input-box">
                  <label htmlFor="nome">Nome<span>*</span></label>
                  <input id="nome" {...register("nome", {required: true} )} placeholder="Nome"/>
                  <span>{errors.nome?.message}</span>
              </div>

              <div id="edit-user-input-box">
                  <label htmlFor="documento">Documento<span>*</span></label>
                  <input id="documento" {...register("documento", {required: true})} placeholder="CPF ou CNPJ"/>
                  <span>{errors.documento?.message}</span>
              </div>
          </div>

          <div id="edit-user-input-line">
              <div id="edit-user-input-box">
                  <label htmlFor="email">E-mail<span>*</span></label>
                  <input id="email" {...register("email", {required: true} )} type="email" placeholder="Email"/>
                  <span>{errors.email?.message}</span>
              </div>

              <div id="edit-user-input-box">
                  <label htmlFor="confirmarEmail" >Confirmar E-mail<span>*</span></label>
                  <input id="confirmarEmail" {...register("emailConfirmar", {required: true})} placeholder="Confirmar Email" />
                  <span data-testid="email-error">{errors.emailConfirmar?.message}</span>
              </div>
          </div>

          <div id="edit-user-input-line">
            <div id="edit-user-input-box">
              <label htmlFor="confirmarEmail" >Senha</label>
              <button className="form-button" id="edit-user-change-password" type="button" onClick={redirectToChangePassword}>
                MUDAR SENHA
              </button>
            </div>
            <div id="edit-user-input-box"></div>
          </div>

          <div id="edit-user-input-line">
              <div id="edit-user-input-box">
                  <label htmlFor="unidadePai">Unidade Pai<span>*</span></label>
                  <select {...register("unidade_pai")} onChange={handleWorkstationChange}>
                      <option value="">Selecione a Unidade de policia</option>
                      {unidadeList?.map((unidade) => (
                      <option key={unidade.id} value={unidade.id}>
                          {unidade.name}
                      </option>
                      ))}
                  </select>
              </div>
              <div id="edit-user-input-box">
                {displayLotacoes && (
                  <>
                    <label htmlFor="unidadeFilha">Unidade Filha<span>*</span></label>
                    <select {...register("unidade_id", {required: "Lotação é obrigatória"})}>
                        <option value="">Selecione a Lotação</option>
                        {unidadeFilhoList?.map((unidade) => (
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

        </div>

        <div id="edit-user-buttons">
          <button className="edit-user-form-button" type="button" id="edit-user-cancel-bnt">
            <Link to="/">CANCELAR</Link>
          </button>
          <button className="edit-user-form-button" type="submit" id="edit-user-register-bnt" disabled={!isValid || isSubmitting}>
            {isSubmitting && (
              <ReloadIcon id="animate-spin"/>
            )}

            {!isSubmitting ? 'SALVAR': "SALVANDO"}
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}
