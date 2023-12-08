import React, { useState, useMemo, useEffect } from "react";
import { getUnidades } from "../services/unidadeService";
import { deleteUser, getUsers } from "../services/userService";
import "../style/pages/usersList.css";
import { Link } from "react-router-dom";
import Search from '../assets/Search.svg';
import Filter from '../assets/Filter.svg';
import Engine from '../assets/engine.svg';
import Profile from '../assets/Profile.svg'
import Input from '../components/Input'; 
import Modal from '../components/ui/Modal';
import Navbar from "../components/navbar/Navbar";
import { ToastContainer, toast } from "react-toastify";


export default function ListUsers() {

  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState();
  const [modalBodytext, setModalBodytext] = useState();
  const [workstations, setWorkstations] = useState();
  const [selectedUser, setSelectedUser] = useState();
  const [users, setUsers] = useState();

  // Puxe os dados do usuário logado.
  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await getUsers();
        
        if (data.type === 'success' && data.data) {
          setUsers(data.data);
        } else {
          toast.error('Erro ao obter os usuários');
        }
      } catch(error) {
        console.log('Erro ao buscar dados do usuário:', error);
        toast.error('Erro ao obter os usuários');
      }
    }
    fetchUserData();
  }, [users]);

  // Puxa os dados das unidades policiais.
  useEffect( () => {
    async function fetchWorkStationData() {
      try {
        const workstationData = await getUnidades();
        console.log(workstationData);
        
        if (workstationData.type ==='success' && workstationData.data) {
          setWorkstations(workstationData.data);
        } else {
          toast.error('Erro ao obter as unidades');
        }

      } catch (error) {
        console.error('Erro ao obter opções do serviço:', error);
      }
    }
    fetchWorkStationData();
  }, []);

  // Excluir usuário.
  async function deleteSelectedUser() {
    if (selectedUser) {
      try {
        const response =  await deleteUser(selectedUser.id);
        console.log(response);
        if (response.type === 'success') {
          const index = users.findIndex(user => user.id === selectedUser.id);
          toast.success("Usuário deletado com sucesso!");

          if (index !== -1) {
            // Remover o usuário da lista
            users.splice(index, 1);
          }
        } else {
          toast.error('Erro ao excluir o usuário');
        }

      } catch (error) {
        console.error('Erro ao excluir o usuário:', error);
      }
    }
    setModalOpen(false);
  }

  // Retorna o filtro sendo usado.
  function filterBeingShown(filter) {
    if (filter === 'admins') {
      return 'Admins';
    } else if (filter === 'rentals'){
      return 'Locadoras'
    } else {
      return 'Todos';
    }
  }

  // Filtra os usuários de acordo com o filtro e a pesquisa.
  const filteredUsers = useMemo(() => {
    if (users) {
      return users.filter(user => {
        const searchLower = search.toLowerCase();
        const {
          nome,
          email,
          documento,
        } = user;

        return (
          search === '' ||
          nome.toLowerCase().includes(searchLower) ||
          email.toLowerCase().includes(searchLower) ||
          documento.toLowerCase().includes(searchLower)
        );
      }).filter(user => {
        return filter === 'all' ||
              (filter === 'admins' && user.cargos.includes('ADMIN')) ||
              (filter === 'rentals' && user.cargos.includes('LOCADORA'));
      });
    }
  }, [users, search, filter]);

  // Modal para excluir usuário.
  const modalDeleteUser = (user) => {
    setSelectedUser(user);
    setModalTitle("Excluir usuário");
    setModalBodytext("Você tem certeza que deseja deletar o usuário?");
    setModalOpen(true);
  }

  return (
    <>

      {modalOpen && (
        <Modal
          setOpenModal={setModalOpen}
          title={modalTitle}
          bodytext={modalBodytext}
          onConfirm={deleteSelectedUser}
        />
      )}

      <>
        <Navbar />
        <div className="listusers-container">
          <div className="listusers-header">

            <div className="listusers-title">
              <h2>Usuários cadastrados</h2>
              <h4>{filterBeingShown(filter)}</h4>
            </div>
            
            <div className="listusers-search">

              <Input onChange={(e) => setSearch(e.target.value)}/>
              <img alt="search" src={Search} />

              <div className="listusers-filter">
                <img alt="filter" src={Filter} />
                <div className="listusers-filter-dropdown-container">
                  <div className="listusers-filter-dropdown">
                    <Link to="#" onClick={() => setFilter('all')}>Todos</Link>
                    <Link to="#" onClick={() => setFilter('admins')}>Admins</Link>
                    <Link to="#" onClick={() => setFilter('rentals')}>Locadoras</Link>
                  </div>
                </div>

              </div>
            </div>

          </div>

          {filteredUsers && filteredUsers.map(user => (
            <div key={user.id} className="listusers-user">
              <div className="listusers-user-image">
                <img alt="user" src={Profile}/>
              </div>

              <div className="listusers-user-name-email">
                <h3>{user.nome}</h3>
                <h4>{user.email}</h4>
              </div>

              <div className="listusers-user-document">
                <h4>{user.documento}</h4>
              </div>

              <div className="listusers-user-positions">
                {user.cargos.map(cargo => (
                  <h4 key={cargo}>{cargo}</h4>
                ))}
              </div>

              <div className="listusers-user-workstation">
                {workstations && (
                  <h4>{workstations.find(workstation => workstation.id === user.unidade_id)?.name}</h4>
                )}
              </div>

              <div className="listusers-engine">
                <img alt="engine" src={Engine}/>
                <div className="listusers-user-dropdown-container">
                  <div className="listusers-user-dropdown">
                    <Link to="#" tabIndex="0" onClick={() => modalDeleteUser(user)} >Excluir</Link>
                    <Link to={`/editarusuario/${user.id}`} tabIndex="0" >Editar</Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <ToastContainer />
        </div>
      </>
    </>
  )

}
