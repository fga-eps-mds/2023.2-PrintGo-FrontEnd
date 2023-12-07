import React, { useState, useMemo, useEffect } from "react";
import { getUnidades } from "../services/unidadeService";
import { getUsers } from "../services/userService";
import "../style/pages/listUsers.css";
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
  const [workstations, setWorkstations] = useState();
  const [users, setUsers] = useState([
    {
      "id": "clpt3te7y000014hq5whhzg0c",
      "email": "admin@admin.com",
      "nome": "Administrador",
      "senha": "opmawdiomaiowemfapwkf",
      "documento": "05699128140",
      "unidade_id": "c97372ff-16ad-4454-ae93-774006ede969",
      "cargos": [
        "USER",
        "ADMIN"
      ]
    },
  ]);

  // Puxe os dados do usuário logado.
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await getUsers();
        
        console.log(data);
        if (data.type === 'success' && data.data) {
          setUsers(data);
        } else {
          toast.error('Erro ao obter os usuários');
        }
      } catch(error) {
        console.log('Erro ao buscar dados do usuário:', error);
        toast.error('Erro ao obter os usuários');
      }
    }
    fetchUserData();
  }, []);

  // Puxa os dados das unidades policiais.
  useEffect( () => {
    async function fetchWorkStationData() {
      try {
        const workstationData = await getUnidades();
        
        if (workstationData.type ==='success' && workstationData.data) {
          setWorkstations(workstationData.data);
        } else {
          toast.error('Erro ao obter as unidades');
        }

      } catch (error) {
        console.error('Erro ao obter opções do serviço:', error);
        toast.error('Erro ao obter as unidades');
      }
    }
    fetchWorkStationData();
  }, []);

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
  const filtereredUsers = useMemo(() => {
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

  return (
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

        {filtereredUsers.map(user => (
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
              {workstations ? (
                <h4>{workstations.find(workstation => workstation.id === user.unidade_id).name}</h4>
              ) : (
                <h4></h4>
              )}
            </div>

            <div className="listusers-engine">
              <img alt="engine" src={Engine}/>
              <div className="listusers-user-dropdown-container">
                <div className="listusers-user-dropdown">
                  <Link to="#" tabIndex="0" >Editar</Link>
                  <Link to="#" tabIndex="0" >Excluir</Link>
                </div>
              </div>
            </div>
          </div>
        ))}
        <ToastContainer />
      </div>
    </>
  )

}