import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as yup from "yup";
import { getUnidades } from "../../services/unidadeService";
import { createUser } from "../../services/userService";
import "../../style/components/editUserForms.css";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useNavigate } from 'react-router-dom';


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

export default function EditUserForm(){

  const fieldLabels = {
    nome: 'Nome',
    documento: 'Documento',
    email: 'E-mail',
    confirmarEmail: 'Confirmar E-mail',
    unidadePai: 'Selecione Unidade Pai',
    unidadeFilha: 'Selecione Unidade Filho'
  };

  const testObject = {
    nome: 'João da Silva',
    documento: '222.222.222-10',
    email: 'joao@gmail.com',
    confirmarEmail: 'joao@gmail.com',
    unidadePai: 'Unidade pai',
    unidadeFilha: 'Unidade filho'
  };

  const token = localStorage.getItem("jwt");
  const loggedUser = decodeToken(token);

  const [unidade, setUnidade] = useState([]);
  const [selectedUnidadePai, setSelectedUnidadePai] = useState('');
  const [selectedUnidadeFilho, setSelectedUnidadeFilho] = useState('');
  const [displayLotacoes,setDisplayLotacoes] = useState ('');
  const [unidadeList, setUnidadeInList] = useState ('');
  const [userData, setUserData] = useState(null);


  const navigate = useNavigate();

  const redirectToChangePassword = () => {
      navigate('/mudarsenha'); 
  };


  const {
      register,
      setValue,
      handleSubmit,
      formState: { errors, isValid, isSubmitting }, 
      reset
  } = useForm({resolver: yupResolver(editUserSchema), mode: "onChange"})

  // Puxe os dados das unidades policiais.
  useEffect( () => {
    async function fetchWorkStationData() {
        try {
          const dataUnidades = await getUnidades();
          
          if (dataUnidades.type ==='success' && dataUnidades.data) {
              setUnidade(dataUnidades.data);
          }

        } catch (error) {
          console.error('Erro ao obter opções do serviço:', error);
        }
    }
    fetchWorkStationData();
  }, []);
  
  // Puxe os dados do usuário logado.
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await axios.get(loggedUser.id);
        
        if (data.type === 'success' && data.data) {
          setUserData(data.data);
        }
      } catch(error) {
        console.log('Erro ao buscar dados do usuário:', error);
      }
    }
    if(loggedUser.id) {
      fetchUserData();
    }
  }, [loggedUser.id])



  const onSubmit = async (data) =>  {

      setTimeout(() => {
          console.log("3 segundos se passaram.");
      }, 3000);  // 3000 milissegundos = 3 segundos
      
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
    <div id="edit-user-card">
      <header id="edit-user-form-header">
        Editar usuário
      </header>
      <form id="edit-user-form" onSubmit={handleSubmit(onSubmit)}>
        <div id="edit-user-input-group">
          {Object.entries(fieldLabels).map(([key, field]) => (
            <div id="edit-user-input-line" key={key}>
              <div id="edit-user-input-box">
                <label>{field.charAt(0).toUpperCase() + field.slice(1)}<span>*</span></label>
                  {key === 'unidadePai' || (key === 'unidadeFilha') ? (
                    <select
                      {...register(key)}
                      onChange={(e) => {
                        if (key === 'unidadePai') {
                          setSelectedUnidadePai(e.target.value);
                          handleWorkstationChange(e);
                        } else {
                          setSelectedUnidadeFilho(e.target.value);
                        }
                      }}
                      value={key === 'unidadePai' ? selectedUnidadePai : selectedUnidadeFilho}
                    >
                    <option value=''>Selecione uma unidade</option>
                    {unidade.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.name}
                      </option>
                    ))}
                    </select>
                
                    ) : (
                    <input
                      {...register(key)}
                      placeholder={field.includes('data') ? 'DD/MM/AAAA' : field.charAt(0).toUpperCase() + field.slice(1)}
                    />
                  )}

                <span>{errors[key]?.message}</span>
              </div>
            </div>
          ))}

          <button id="change-password" type="button" onClick={redirectToChangePassword}>
            MUDAR SENHA
          </button>
        </div>

        <div id="edit-user-buttons">
          <button className="form-button" type="button" id="edit-user-cancel-bnt" >CANCELAR</button>
          <button className="form-button" type="submit" id="edit-user-register-bnt" disabled={!isValid || isSubmitting}>
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