import React from 'react';
import { render, screen, waitFor, fireEvent} from '@testing-library/react';
import UsersList from '../../pages/UsersList';
import '@testing-library/jest-dom/extend-expect';
import * as router from 'react-router-dom';
import { getUnidades } from "../../services/unidadeService";
import { decodeToken } from 'react-jwt';
import { getUsers, deleteUser } from '../../services/userService';



/*{
  "id": "clpro9knn0000dpq38yyb4q1h",
  "email": "rogerio123@gmail.com",
  "nome": "Rogerio Silva",
  "documento": "86223916981",
  "unidade_id": "f39a868c-dbf7-4fca-a257-f915311b5a79",
  "cargos": [
    "USER"
  ]
}
{
  "id": "f39a868c-dbf7-4fca-a257-f915311b5a79",
  "name": "Unidade Regional Goiania 3",
  "phone": "62 1111-1111",
  "ip": "0.0.0.0 ~ 0.0.0.0",
  "gateway": "",
  "is_regional": false,
  "vpn": false,
  "city": {
    "id": "e240d1f7-3e07-4c49-bfce-59ae6d4a1d2b",
    "name": "Goiania",
    "state": "Goias"
  },
  "parent_workstation": {
    "id": "bfcf915f-38ca-4754-b598-c085cfe0548a",
    "name": "Unidade Administrativa Campinas Goiania",
    "phone": "62 1111-1111",
    "ip": "0.0.0.0 ~ 0.0.0.0",
    "gateway": "",
    "is_regional": false,
    "vpn": false
  },
  "child_workstations": []
}


{
  "id": "c97372ff-16ad-4454-ae93-774006ede969",
  "name": "Unidade Regional Campinas Goiania",
  "phone": "62 1111-1111",
  "ip": "0.0.0.0 ~ 0.0.0.0",
  "gateway": "",
  "is_regional": false,
  "vpn": false,
  "city": {
    "id": "e240d1f7-3e07-4c49-bfce-59ae6d4a1d2b",
    "name": "Goiania",
    "state": "Goias"
  },
  "parent_workstation": {
    "id": "bfcf915f-38ca-4754-b598-c085cfe0548a",
    "name": "Unidade Administrativa Campinas Goiania",
    "phone": "62 1111-1111",
    "ip": "0.0.0.0 ~ 0.0.0.0",
    "gateway": "",
    "is_regional": false,
    "vpn": false
  },
  "child_workstations": []
}

{
  "id": "clpu9ill30000aukx7vtrdcfd",
  "email": "teste10@teste.com",
  "nome": "teste10",
  "senha": "$2a$10$XoVUy5F7CqjPcJXy/cst8eRW1CZkNKXCVfOu0hB5vqLwavug4/MCu",
  "documento": "10348369000",
  "unidade_id": "c97372ff-16ad-4454-ae93-774006ede969",
  "resetPasswordToken": "",
  "resetPasswordExpires": "",
  "cargos": [
    "USER"
  ]

  data: [
    {
      "id": "clpro9knn0000dpq38yyb4q1h",
      "email": "rogerio123@gmail.com",
      "nome": "Rogerio Silva",
      "documento": "86223916981",
      "unidade_pai": "Unidade Administrativa Campinas Goiania",
      "unidade_filha": "Unidade Regional Campinas Goiania",
      "cargos": [
        "USER"
      ]
    },

    {
      "id": "clpu9ill30000aukx7vtrdcfd",
      "email": "teste10@teste.com",
      "nome": "teste10",
      "documento": "10348369000",
      "unidade_pai": "Unidade Administrativa Campinas Goiania",
      "unidade_filha": "Unidade Regional Campinas Goiania",
      "cargos": [
        "ADMIN"
      ]
    } 
  ]


}*/
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNscHJpaTRyOTAwMDFhaDJjazk5cWNxYW0iLCJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsIm5vbWUiOiJBZG1pbiIsImNhcmdvcyI6WyJVU0VSIiwiQURNSU4iXSwiaWF0IjoxNzAxODg5NjY5LCJleHAiOjE3MDE4OTMyNjl9.2yqtoHjjXjguYkOVC9wZYiO_pASsyQO_o0z3d-4JFR0";

jest.mock('../../services/unidadeService', () => ({
  getUnidades: jest.fn(),
}))

jest.mock('../../services/userService', () => ({
  getUsers: jest.fn(),
  deleteUser: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

jest.mock('react-jwt', () => ({
  decodeToken: jest.fn(),
}))

describe('UsersListPage', () => {

  beforeEach(() => {
    getUnidades.mockResolvedValue({
      type: 'success',
      data: [
        {id: 1, nome: "unidade1"},
        {id: 2, nome: "unidade2"},
        {id: 3, nome: "unidade3"},
      ]
    });
    router.useNavigate.mockImplementation(jest.requireActual('react-router-dom').useNavigate);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('renders Navbar, and UsersList', () => {
    
    render(
    <router.BrowserRouter>
      <UsersList />
    </router.BrowserRouter>
    );
    expect(screen.getByTestId("listusers-container")).toBeInTheDocument()
  });

  test("deve filtrar usuarios com base na pesquisa", async() => {
    
    getUnidades.mockResolvedValue({
      type: 'success',
      data: [
        {id: '1', name: "unidade1", child_workstations: [{id: '2', name: "unidade2"}, {id: '3', name: "unidade3"}]},
        {id: '2', name: "unidade2", parent_workstation: {id: "1"}},
        {id: '3', name: "unidade3"}
      ]
    });

    getUsers.mockResolvedValue(
      {
        type: 'success',
        data: [
          {
          "id": "clprc9gem0001y06nguit2ikt",
          "email": "ass@example.com",
          "nome": "Another User",
          "senha": "$2a$10$Dw/zp0AIR8G1Fxy0kR9tOu9MOyYTLBkwRyVXDlFEedDjMY4h23Wsu",
          "documento": "46921264009",
          "unidade_id": "2",
          "resetPasswordToken": "a7f8f87806d8cf757770621a6f9b16b8165660a5",
          "resetPasswordExpires": "2023-12-06T22:49:18.221Z",
          "cargos": [
            "USER"
          ]
          },
          {
            "id": "clprc9gem0001y06nguit2ikt",
            "email": "teste2@example.com",
            "nome": "teste2",
            "senha": "$2a$10$Dw/zp0AIR8G1Fxy0kR9tOu9MOyYTLBkwRyVXDlFEedDjMY4h23Wsu",
            "documento": "46921264009",
            "unidade_id": "2",
            "resetPasswordToken": "a7f8f87806d8cf757770621a6f9b16b8165660a5",
            "resetPasswordExpires": "2023-12-06T22:49:18.221Z",
            "cargos": [
              "USER"
            ]
          }
        ]

      },
    );
    
    render(
      <router.BrowserRouter>
        <UsersList />
      </router.BrowserRouter>
    );

    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "Another User" },
    });

    await waitFor(() => {
      
      expect(screen.getByText("ass@example.com")).toBeInTheDocument();
      
    });
    
    
  });

  test('renders search', () => {
    
    render(
    <router.BrowserRouter>
      <UsersList />
    </router.BrowserRouter>
    );
    expect(screen.getByTestId("listusers-search")).toBeInTheDocument()
  });

  
  test('mostra dropdown dos filtros', () => {
    
    render(
    <router.BrowserRouter>
      <UsersList />
    </router.BrowserRouter>
    );
    expect(screen.getByTestId("listusers-filter")).toBeInTheDocument()
  });

  test('deve renderizar a lista de usuarios', async() => {
    jest.spyOn(Storage.prototype, 'getItem').mockReturnValue(token);
    decodeToken.mockReturnValue({
      "id": "clprc9gem0001y06nguit2ikt",
      "email": "ass@example.com",
      "nome": "Another User",
      "cargos": [
        "USER"
      ]
    })

    getUnidades.mockResolvedValue({
      type: 'success',
      data: [
        {id: '1', name: "unidade1", child_workstations: [{id: '2', name: "unidade2"}, {id: '3', name: "unidade3"}]},
        {id: '2', name: "unidade2", parent_workstation: {id: "1"}},
        {id: '3', name: "unidade3"}
      ]
    });

    getUsers.mockResolvedValue(
      {
        type: 'success',
        data: [
          {
          "id": "clprc9gem0001y06nguit2ikt",
          "email": "ass@example.com",
          "nome": "Another User",
          "senha": "$2a$10$Dw/zp0AIR8G1Fxy0kR9tOu9MOyYTLBkwRyVXDlFEedDjMY4h23Wsu",
          "documento": "46921264009",
          "unidade_id": "2",
          "resetPasswordToken": "a7f8f87806d8cf757770621a6f9b16b8165660a5",
          "resetPasswordExpires": "2023-12-06T22:49:18.221Z",
          "cargos": [
            "USER"
          ]
          }
        ]

      }
    );


    render(
      <router.BrowserRouter>
        <UsersList />
      </router.BrowserRouter>
      );
    
    await waitFor(() => {
      
      expect(screen.getByText("ass@example.com")).toBeInTheDocument();
      
    });
  });


  test('deve mostrar qual filtro esta sendo usado', async() => {
    jest.spyOn(Storage.prototype, 'getItem').mockReturnValue(token);
    decodeToken.mockReturnValue({
      "id": "clprc9gem0001y06nguit2ikt",
      "email": "ass@example.com",
      "nome": "Another User",
      "cargos": [
        "USER"
      ]
    })

    getUnidades.mockResolvedValue({
      type: 'success',
      data: [
        {id: '1', name: "unidade1", child_workstations: [{id: '2', name: "unidade2"}, {id: '3', name: "unidade3"}]},
        {id: '2', name: "unidade2", parent_workstation: {id: "1"}},
        {id: '3', name: "unidade3"}
      ]
    });

    getUsers.mockResolvedValue(
      {
        type: 'success',
        data: [
          {
          "id": "clprc9gem0001y06nguit2ikt",
          "email": "ass@example.com",
          "nome": "Another User",
          "senha": "$2a$10$Dw/zp0AIR8G1Fxy0kR9tOu9MOyYTLBkwRyVXDlFEedDjMY4h23Wsu",
          "documento": "46921264009",
          "unidade_id": "2",
          "resetPasswordToken": "a7f8f87806d8cf757770621a6f9b16b8165660a5",
          "resetPasswordExpires": "2023-12-06T22:49:18.221Z",
          "cargos": [
            "USER"
          ]
          }
        ]

      }
    );


    render(
      <router.BrowserRouter>
        <UsersList />
      </router.BrowserRouter>
      );
    
    await waitFor(() => {
      
      expect(screen.getByRole('heading', { name: "Todos" })).toBeInTheDocument();
    });
  });

  test('deve mostrar o filtro corretamente apos mudar para admin', async() => {
    jest.spyOn(Storage.prototype, 'getItem').mockReturnValue(token);
    decodeToken.mockReturnValue({
      "id": "clprc9gem0001y06nguit2ikt",
      "email": "ass@example.com",
      "nome": "Another User",
      "cargos": [
        "ADMIN"
      ]
    })

    getUnidades.mockResolvedValue({
      type: 'success',
      data: [
        {id: '1', name: "unidade1", child_workstations: [{id: '2', name: "unidade2"}, {id: '3', name: "unidade3"}]},
        {id: '2', name: "unidade2", parent_workstation: {id: "1"}},
        {id: '3', name: "unidade3"}
      ]
    });

    getUsers.mockResolvedValue(
      {
        type: 'success',
        data: [
          {
          "id": "clprc9gem0001y06nguit2ikt",
          "email": "ass@example.com",
          "nome": "Another User",
          "senha": "$2a$10$Dw/zp0AIR8G1Fxy0kR9tOu9MOyYTLBkwRyVXDlFEedDjMY4h23Wsu",
          "documento": "46921264009",
          "unidade_id": "2",
          "resetPasswordToken": "a7f8f87806d8cf757770621a6f9b16b8165660a5",
          "resetPasswordExpires": "2023-12-06T22:49:18.221Z",
          "cargos": [
            "ADMIN"
          ]
          }
        ]

      }
    );


    render(
      <router.BrowserRouter>
        <UsersList />
      </router.BrowserRouter>
      );
    
    await waitFor(() => {
      const filtroAdmin = screen.getByRole('link', { name: "Admins" })
      fireEvent.click(filtroAdmin);
      expect(screen.getByRole('heading', { name: "Admins" })).toBeInTheDocument();
    });
  });


  test('deve mostrar o filtro corretamente apos mudar para admin', async() => {
    jest.spyOn(Storage.prototype, 'getItem').mockReturnValue(token);
    decodeToken.mockReturnValue({
      "id": "clprc9gem0001y06nguit2ikt",
      "email": "ass@example.com",
      "nome": "Another User",
      "cargos": [
        "LOCADORA"
      ]
    })

    getUnidades.mockResolvedValue({
      type: 'success',
      data: [
        {id: '1', name: "unidade1", child_workstations: [{id: '2', name: "unidade2"}, {id: '3', name: "unidade3"}]},
        {id: '2', name: "unidade2", parent_workstation: {id: "1"}},
        {id: '3', name: "unidade3"}
      ]
    });

    getUsers.mockResolvedValue(
      {
        type: 'success',
        data: [
          {
          "id": "clprc9gem0001y06nguit2ikt",
          "email": "ass@example.com",
          "nome": "Another User",
          "senha": "$2a$10$Dw/zp0AIR8G1Fxy0kR9tOu9MOyYTLBkwRyVXDlFEedDjMY4h23Wsu",
          "documento": "46921264009",
          "unidade_id": "2",
          "resetPasswordToken": "a7f8f87806d8cf757770621a6f9b16b8165660a5",
          "resetPasswordExpires": "2023-12-06T22:49:18.221Z",
          "cargos": [
            "LOCADORA"
          ]
          }
        ]

      }
    );


    render(
      <router.BrowserRouter>
        <UsersList />
      </router.BrowserRouter>
      );
    
    await waitFor(() => {
      const filtroLocadora = screen.getByRole('link', { name: "Locadoras" })
      fireEvent.click(filtroLocadora);
      expect(screen.getByRole('heading', { name: "Locadoras" })).toBeInTheDocument();
    });
  });


  test("deve mostrar o modal de exclusao", async () => {
    jest.spyOn(Storage.prototype, 'getItem').mockReturnValue(token);
    decodeToken.mockReturnValue({
      "id": "clprc9gem0001y06nguit2ikt",
      "email": "ass@example.com",
      "nome": "Another User",
      "cargos": [
        "USER"
      ]
    })

    getUnidades.mockResolvedValue({
      type: 'success',
      data: [
        {id: '1', name: "unidade1", child_workstations: [{id: '2', name: "unidade2"}, {id: '3', name: "unidade3"}]},
        {id: '2', name: "unidade2", parent_workstation: {id: "1"}},
        {id: '3', name: "unidade3"}
      ]
    });

    getUsers.mockResolvedValue(
      {
        type: 'success',
        data: [
          {
          "id": "clprc9gem0001y06nguit2ikt",
          "email": "ass@example.com",
          "nome": "Another User",
          "senha": "$2a$10$Dw/zp0AIR8G1Fxy0kR9tOu9MOyYTLBkwRyVXDlFEedDjMY4h23Wsu",
          "documento": "46921264009",
          "unidade_id": "2",
          "resetPasswordToken": "a7f8f87806d8cf757770621a6f9b16b8165660a5",
          "resetPasswordExpires": "2023-12-06T22:49:18.221Z",
          "cargos": [
            "USER"
          ]
          }
        ]

      }
    );


    render(
      <router.BrowserRouter>
        <UsersList />
      </router.BrowserRouter>
    );
  
    await waitFor(() => {
      const botaoExcluir = screen.getByTestId("dropdown-user-excluir")
      fireEvent.click(botaoExcluir);
  
   
      expect(screen.getByText("Excluir usuário")).toBeInTheDocument();
       
    });
    //const botaoExcluir = screen.getByRole("link",{name:"Excluir"});
    
  });


  test('should make API call for getting a user and return error', async() => {
    getUsers.mockReturnValue({ type: 'error' });

    render(
      <router.BrowserRouter>
        <UsersList />
      </router.BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("Erro ao obter os usuários")).toBeInTheDocument()
      expect(getUsers).toHaveReturnedWith({ type: 'error' });
    });

  });

  test('should make API call for getting a user and catch a error', async() => {
    getUsers.mockRejectedValue(new Error('error'));

    render(
      <router.BrowserRouter>
        <UsersList />
      </router.BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("Erro ao obter os usuários")).toBeInTheDocument()
      expect(getUsers).toHaveReturned();
    });

  });

  test('should make API call for getting a workstations and return error', async() => {
    getUnidades.mockReturnValue({ type: 'error' });

    render(
      <router.BrowserRouter>
        <UsersList />
      </router.BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Erro ao obter as unidades')).toBeInTheDocument()
      expect(getUnidades).toHaveReturnedWith({ type: 'error' });
    });

  });

  test('should make API call for getting a workstations and catch a error', async() => {
    getUnidades.mockRejectedValue(new Error('error'));

    render(
      <router.BrowserRouter>
        <UsersList />
      </router.BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Erro ao obter as unidades')).toBeInTheDocument()
      expect(getUnidades).toHaveReturned();
    });

  });

  test('should open modal and delete a user', async () => {
    getUsers.mockResolvedValue({
      type: 'success',
      data: [
        {
        "id": "clprc9gem0001y06nguit2ikt",
        "email": "ass@example.com",
        "nome": "Another User",
        "senha": "$2a$10$Dw/zp0AIR8G1Fxy0kR9tOu9MOyYTLBkwRyVXDlFEedDjMY4h23Wsu",
        "documento": "46921264009",
        "unidade_id": "2",
        "resetPasswordToken": "a7f8f87806d8cf757770621a6f9b16b8165660a5",
        "resetPasswordExpires": "2023-12-06T22:49:18.221Z",
        "cargos": [
          "USER"
        ]
        }
      ]
    });

    deleteUser.mockResolvedValue({ type: 'success' });

    render(
      <router.BrowserRouter>
        <UsersList />
      </router.BrowserRouter>
    );

    await waitFor(() => {
      // Verifica se o usuário está na lista.
      expect(screen.getByText("Another User")).toBeInTheDocument();
    });

    const deleteUserButton = screen.getByTestId("dropdown-user-excluir");
    fireEvent.click(deleteUserButton);

    await waitFor(() => {
      // Verifica se o o modal abriu.
      expect(screen.getByText("Você tem certeza que deseja deletar o usuário?")).toBeInTheDocument();
    });

    const modalConfirmButton = screen.getByText("Confirmar");
    fireEvent.click(modalConfirmButton);

    await waitFor(() => {
      // Verifica se o o modal abriu.
      expect(deleteUser).toHaveBeenCalledWith("clprc9gem0001y06nguit2ikt");
    });

  })
});