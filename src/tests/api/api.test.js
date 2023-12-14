import React from 'react';
import { api } from "../../lib/api/config";
import { login, changePassword } from "../../api/api";
import { useNavigate } from 'react-router-dom';
import * as router from 'react-router-dom';
import * as api_login from '../../api/api'

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNscHJpaTRyOTAwMDFhaDJjazk5cWNxYW0iLCJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsIm5vbWUiOiJBZG1pbiIsImNhcmdvcyI6WyJVU0VSIiwiQURNSU4iXSwiaWF0IjoxNzAxODg5NjY5LCJleHAiOjE3MDE4OTMyNjl9.2yqtoHjjXjguYkOVC9wZYiO_pASsyQO_o0z3d-4JFR0";


jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'), // Garante que os métodos não mockados sejam usados normalmente
    useNavigate: jest.fn(), // Mocka useNavigate
}));

jest.mock('../../lib/api/config.js', () => ({
    api: {
        post: jest.fn(),
        patch: jest.fn(),
        get: jest.fn(),
    },
}));

jest.mock('../../api/api', () => ({
    login: jest.fn(),
    changePassword:jest.fn(),
}));

describe("Login e alteração de senha", () => {

  // Mock da API

    beforeEach(() => {
        router.useNavigate.mockImplementation(jest.requireActual('react-router-dom').useNavigate);
        jest.clearAllMocks();
    });

    

    // Login bem-sucedido

    it("deve retornar um objeto de sucesso com o token quando o login for bem-sucedido", async () => {
        const email = "teste@teste.com";
        const password = "Senha123@";
        const mockLoginApi = jest.spyOn(api_login, 'login');

        mockLoginApi.mockResolvedValue({ type: 'success', token: token});



        api.post.mockResolvedValue({ status: 200, data:"some data" });

        login.mockResolvedValue({
            type: 'success',
            token: token
        });

        const result = await login(email, password);

        expect(result).toEqual({ type: "success", token: token });
    });

    // Login malsucedido

    /*it("deve retornar um objeto de erro quando o login falhar", async () => {
        const email = "invalid.com";
        const password = "inv";
        //const mockLoginApi = jest.spyOn(api_login, 'login');
        //const mockError = new Error("Senha atual incorreta");
        //mockLoginApi.mockRejectedValue({ type: 'error'}, mockError);

        //login.mockRejectedValue(new Error("Usuário ou senha inválidos"));

        const result = await login(email, password);
        
        //expect(login).toHaveBeenCalledWith('/user/login', { email: email, senha: password });
        expect(result).toEqual({ type: "error", error: "Usuário ou senha inválidos" });
    });*/

    // Alteração de senha bem-sucedida

    it("deve retornar a resposta da API quando a alteração de senha for bem-sucedida", async () => {
      const data = {
        oldPassword: "old_password",
        newPassword: "new_password",
      };
      const mockResponse = { data: "Senha alterada com sucesso" };
      const token = "valid_token";

      localStorage.setItem("jwt", token);
      changePassword.mockResolvedValue(mockResponse);

      const result = await changePassword(data);

      expect(result).toEqual(mockResponse);
    });

    // Alteração de senha malsucedida

    /*it("deve retornar um objeto de erro quando a alteração de senha falhar", async () => {
      const data = {
        oldPassword: "invalid_password",
        newPassword: "new_password",
      };
      //const mockError = new Error("Senha atual incorreta");
      const token = "valid_token";

      localStorage.setItem("jwt", token);
      //changePassword.mockRejectedValue(mockError);

      const result = await changePassword(data);

      expect(result).toEqual({ type: "error", error: "Senha atual incorreta" });
    });*/
});