import React, { useState, useMemo } from "react";
import "../style/pages/listUsers.css";
import { Link } from "react-router-dom";
import Search from '../assets/Search.svg';
import Filter from '../assets/Filter.svg';
import Engine from '../assets/engine.svg';
import Input from '../components/Input'; 
import Modal from '../components/ui/Modal';
import Navbar from "../components/navbar/Navbar";

export default function ListUsers() {

  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [users, setUsers] = useState();

  function filterBeingShown(filter) {
    if (filter === 'admins') {
      return 'Admins';
    } else if (filter === 'rentals'){
      return 'Locadoras'
    } else {
      return 'Todas';
    }
  }

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
            <h4>Todos</h4>
          </div>
          
          <div className="listusers-search">
            <Input/>
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
      </div>
    </>
  )

}