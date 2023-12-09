import { getUnidades } from '../../services/unidadeService'
import { api } from '../../lib/api/config';

jest.mock('../../lib/api/config.js', () => ({
  api: {
    get: jest.fn(),
  },
}));

describe('UnidadesService API functions', () => {

  it('should get workstations', async () => {
    api.get.mockResolvedValue({data: [{id: '1', name: 'unidade1'}]});

    const result = await getUnidades();

    expect(api.get).toHaveBeenCalledWith('/schedular/workstations');
    expect(result).toEqual({ type: 'success', data: [{id: '1', name: 'unidade1'}]});
  });

  it('should get workstations and catch error', async () => {
    api.get.mockRejectedValue(new Error('error'));

    const result = await getUnidades();

    expect(api.get).toHaveBeenCalledWith('/schedular/workstations');
    expect(result).toEqual({type: 'error', error: new Error('error')});
  });

});