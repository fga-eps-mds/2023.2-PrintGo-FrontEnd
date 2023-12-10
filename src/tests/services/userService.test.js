import { createUser, forgottenPassword, getUserById, recoverPassword, updateUser } from '../../services/userService'
import { api } from '../../lib/api/config';

jest.mock('../../lib/api/config.js', () => ({
  api: {
    post: jest.fn(),
    patch: jest.fn(),
    get: jest.fn(),
  },
}));

describe('UserService API functions', () => {
  
  it('creates a user', async () => {
    const user = {
      email: "teste12@teste.com",
      nome: "Teste12",
      senha: "Teste123@",
      documento: "163.991.200-20",
      unidade_id: "e240d1f7-3e07-4c49-bfce-59ae6d4a1d2b",
      cargos: [
        "USER"
      ]
    }
    api.post.mockResolvedValue({data: "some data"});

    const result = await createUser(user);

    expect(api.post).toHaveBeenCalledWith('/user/create', user);
    expect(result).toEqual({ type: 'success', data: 'some data' });
  });

  it('creates a user and catches error', async () => {
    const user = {
      email: "teste12@teste.com",
      nome: "Teste12",
      senha: "Teste123@",
      documento: "163.991.200-20",
      unidade_id: "e240d1f7-3e07-4c49-bfce-59ae6d4a1d2b",
      cargos: [
        "USER"
      ]
    }
    api.post.mockRejectedValue(new Error('error'));

    const result = await createUser(user);

    expect(api.post).toHaveBeenCalledWith('/user/create', user);
    expect(result).toEqual({ type: 'error', error: new Error('error') });
  });

  it('updates a user', async () => {
    const user = {
      id: 1,
      email: "teste12@teste.com",
      nome: "Teste12",
      senha: "Teste123@",
      documento: "163.991.200-20",
      unidade_id: "e240d1f7-3e07-4c49-bfce-59ae6d4a1d2b",
      cargos: [
        "USER"
      ]
    }
    const userId = 1;
    api.patch.mockResolvedValue({data: "update data"});

    const result = await updateUser(user, userId);

    expect(api.patch).toHaveBeenCalledWith(`/user/${userId}`, user);
    expect(result).toEqual({ type: 'success', data: 'update data' });
  });

  it('updates a user and catches error', async () => {
    const user = {
      id: 1,
      email: "teste12@teste.com",
      nome: "Teste12",
      senha: "Teste123@",
      documento: "163.991.200-20",
      unidade_id: "e240d1f7-3e07-4c49-bfce-59ae6d4a1d2b",
      cargos: [
        "USER"
      ]
    }
    const userId = 1;
    api.patch.mockRejectedValue(new Error('error'));

    const result = await updateUser(user, userId);

    expect(api.patch).toHaveBeenCalledWith(`/user/${userId}`, user);
    expect(result).toEqual({ type: 'error', error: new Error('error') });
  });

  it('gets a user by id', async () => {
    const userId = 1;
    api.get.mockResolvedValue({data: "update data"});

    const result = await getUserById(userId);

    expect(api.get).toHaveBeenCalledWith(`/user/${userId}`);
    expect(result).toEqual('update data');
  });

  it('gets a user by id and catches error', async () => {
    const userId = 1;
    api.get.mockRejectedValue(new Error('error'));

    const result = await getUserById(userId);

    expect(api.get).toHaveBeenCalledWith(`/user/${userId}`);
    expect(result).toEqual({ type: 'error', error: new Error('error') });
  });

  it('sends forgotten password email', async () => {
    const email = 'teste@teste.com';
    api.post.mockResolvedValue({status: 201, data: "some data"});

    const result = await forgottenPassword(email);

    expect(api.post).toHaveBeenCalledWith('/user/forgotten-password', email);
    expect(result).toEqual({ type: 'success', data: 'some data' });
  });

  it('sends forgotten password email and returns status 500', async () => {
    const email = 'teste@teste.com';
    api.post.mockResolvedValue({status: 500, data: "some data"});

    const result = await forgottenPassword(email);

    expect(api.post).toHaveBeenCalledWith('/user/forgotten-password', email);
    expect(result).toEqual({ type: 'error', error: 'Erro não foi possível enviar email!' });
  });

  it('sends forgotten password email and catches error', async () => {
    const email = 'teste@teste.com';
    api.post.mockRejectedValue(new Error('error'));

    const result = await forgottenPassword(email);

    expect(api.post).toHaveBeenCalledWith('/user/forgotten-password', email);
    expect(result).toEqual({ type: 'error', error: new Error('error') });
  });

  it('recovers password', async () => {
    const data = {token: "token", senha: "Teste123@"};
    api.post.mockResolvedValue({status: 201, data: "some data"});

    const result = await recoverPassword(data);

    expect(api.post).toHaveBeenCalledWith('/user/recover-password', data);
    expect(result).toEqual({ type: 'success', data: 'some data' });
  })

  it('recovers password and returns status 500', async () => {
    const data = {token: "token", senha: "Teste123@"};
    api.post.mockResolvedValue({status: 500, data: "some data"});

    const result = await recoverPassword(data);

    expect(api.post).toHaveBeenCalledWith('/user/recover-password', data);
    expect(result).toEqual({ type: 'error', error: 'Erro não foi possível enviar email!' });
  })

  it('recovers password and catches error', async () => {
    const data = {token: "token", senha: "Teste123@"};
    api.post.mockRejectedValue(new Error('error'));

    const result = await recoverPassword(data);

    expect(api.post).toHaveBeenCalledWith('/user/recover-password', data);
    expect(result).toEqual({ type: 'error', error: new Error('error') });
  })
})