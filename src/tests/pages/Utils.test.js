import { extractDate, formatDate } from '../../utils/utils';
describe('Utilitários de Data', () => {
  describe('extractDate', () => {
    it('deve extrair e formatar a data corretamente', () => {
      const dateString = '2023-12-01T12:00:00Z';
      const result = extractDate(dateString);
      expect(result).toBe('02/12/23'); 
    });

    it('deve lidar com meses de um dígito', () => {
      const dateString = '2023-01-01T12:00:00Z';
      const result = extractDate(dateString);
      expect(result).toBe('02/01/23');
    });

    it('deve lidar com dias de um dígito', () => {
      const dateString = '2023-12-01T12:00:00Z';
      const result = extractDate(dateString);
      expect(result).toBe('02/12/23');
    });
  });

  describe('formatDate', () => {
    it('deve formatar a data corretamente para o formato AAAA-MM-DD', () => {
      const dateString = '2023-12-01T12:00:00Z';
      const result = formatDate(dateString);
      expect(result).toBe('2023-12-02'); 
    });

    it('deve lidar com meses de um dígito', () => {
      const dateString = '2023-01-01T12:00:00Z';
      const result = formatDate(dateString);
      expect(result).toBe('2023-01-02');
    });

    it('deve lidar com dias de um dígito', () => {
      const dateString = '2023-12-01T12:00:00Z';
      const result = formatDate(dateString);
      expect(result).toBe('2023-12-02');
    });
  });
});
