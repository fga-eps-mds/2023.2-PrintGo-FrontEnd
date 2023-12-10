import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getUnidades } from "../../services/unidadeService";
import { getUserById, updateUser } from "../../services/userService";
import "../../style/components/editUserForms.css";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { decodeToken } from "react-jwt";
import { getEditUserSchema } from "../utils/YupSchema";

const fieldLabels = {
  nome: 'Nome',
  documento: 'CPF',
  email: 'Email',
  emailConfirmar: 'Email',
  unidade_id: "Unidade",
};

const testObject = {
  nome: 'Fulano',
  documento: '01234567890',
  email: 'email@email.com',
  emailConfirmar: 'email@email.com',
};

export default function EditUserForm(){
  const { id } = useParams();

  const editUserSchema = getEditUserSchema(fieldLabels);
  const { register, getValues, setValue, handleSubmit, formState: { errors, isValid, isSubmitting  }, reset } = useForm({
    resolver: yupResolver(editUserSchema),
    mode: "onChange"
  });

  let loggedUser = null;
  const token = localStorage.getItem("jwt");
  if (token) {
    loggedUser = decodeToken(token);
  }

  const [unidadeList, setUnidadeList] = useState();
  const [isEditingAnotherAdmin, setIsEditingAnotherAdmin] = useState(); //verifica se o usuario que esta sendo editado eh admin
  const [isLocadora, setIsLocadora] = useState(); //verifica se o usuario que esta sendo editado eh da locadora
  const [displayLotacoes,setDisplayLotacoes] = useState ('');
  const [unidadeFilhoList, setUnidadeFilhoList] = useState ();
  const [userData, setUserData] = useState(null);
  const [displayUserRole, setDisplayUserRole] = useState(true);

  const memoUserData = useMemo(() => userData, [userData]);
  const memoUnidadeList = useMemo(() => unidadeList, [unidadeList]);

  const handleCheckboxLocadoraChange = (event) => {
    setIsLocadora(event.target.checked);
  };

  const handleCheckboxAdminChange = (event) =>{
    setIsEditingAnotherAdmin(event.target.checked);
  }

  const navigate = useNavigate();

  // Puxe os dados do usuário logado.
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await getUserById(id);
        
        if (data) {
          setUserData(data);
          if(data.cargos.includes("ADMIN")){
            setIsEditingAnotherAdmin(true);
          }
          if(data.cargos.includes("LOCADORA")){
            setIsLocadora(true);
          }
        }
      } catch(error) {
        console.log('Erro ao buscar dados do usuário:', error);
      }
    }

    const verifyUser = async () =>{
      if(loggedUser && !userData) {
        await fetchUserData();

        if(loggedUser.cargos.includes("ADMIN")) {
          if(loggedUser.id === id){ 
            setDisplayUserRole(false);
          }
          else{
            return;
          }
        } else {
          if(loggedUser.id != id) {
            navigate("/"); // Um usuário comum não pode editar outro usuário além dele mesmo.
          } else {
            setDisplayUserRole(false);
          }
        }
        
      }
    }

    verifyUser();
    
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
      Object.keys(editUserSchema.fields).forEach((key) => {
        if (userData[key]) {
          setValue(key, userData[key]);
        }
      })

      isEditingAnotherAdmin ? setValue("isAdmin", true) : setValue("isAdmin", false);
      isLocadora ? setValue("isLocadora", true) : setValue("isLocadora", false);
      
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
    data.id = id;

    data.cargos = ["USER"]

    if (data.isAdmin) {
      data.cargos = data.cargos || [];
      data.cargos.push("ADMIN")
    }

    if (data.isLocadora) {
      data.cargos = data.cargos || [];
      data.cargos.push("LOCADORA")
    }

    delete data["isAdmin"];
    delete data["isLocadora"];
    delete data["emailConfirmar"];
    delete data["unidade_pai"];

    console.log(data);

    setTimeout(() => {
      console.log("3 segundos se passaram.");
    }, 3000);  // 3000 milissegundos = 3 segundos

    const response = await updateUser(data, data.id);
    if(response.type === 'success'){
      toast.success("Usuario atualizado com sucesso!");
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
      <Link id="link-back" to="/listausuarios">Voltar</Link>
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
              <label htmlFor="edit-user-change-password" >Senha</label>
              <button className="form-button" id="edit-user-change-password" type="button" onClick={redirectToChangePassword}>
                MUDAR SENHA
              </button>
            </div>
            <div id="edit-user-input-box"></div>
          </div>

          <div id="edit-user-input-line">
              <div id="edit-user-input-box">
                  <label htmlFor="unidadePai">Unidade Pai<span>*</span></label>
                  <select data-testid="unidadePai" {...register("unidade_pai")} onChange={handleWorkstationChange}>
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
                    <select data-testid="unidadeFilha"{...register("unidade_id", {required: "Lotação é obrigatória"})}>
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
        {displayUserRole && (
          <div id="edit-user-input-line">
            <div id="edit-user-input-box">
                <div id="edit-user-input-checkbox" data-testid="admin-checkbox">
                    <input
                        id="checkbox"
                        type="checkbox"
                        {...register("isAdmin")}
                        onChange={handleCheckboxAdminChange}
                    />
                   
                    <label htmlFor="label-checkbox" id="label-checkbox">Usuário é administrador?</label>
                </div>
            </div>
            <div id="edit-user-input-box">
                <div id="edit-user-input-checkbox" data-testid="locadora-checkbox">
                    <input
                        id="checkbox"
                        type="checkbox"
                        {...register("isLocadora")}
                        onChange={handleCheckboxLocadoraChange}
                    />
                    <label htmlFor="label-checkbox" id="label-checkbox">Usuário é da Locadora?</label>
                </div>
            </div>
          </div>
        )}
        

        <div id="edit-user-buttons">
          <button className="edit-user-form-button" type="button" id="edit-user-cancel-bnt">
            <Link to="#">CANCELAR</Link>
          </button>
          <button className="edit-user-form-button" type="submit" id="edit-user-register-bnt" disabled={isSubmitting || !isValid}>
            {isSubmitting && (
              <ReloadIcon id="animate-spin" data-testid="animate-spin"/>
            )}

            {!isSubmitting ? 'SALVAR': "SALVANDO"}
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}

export { fieldLabels, testObject };