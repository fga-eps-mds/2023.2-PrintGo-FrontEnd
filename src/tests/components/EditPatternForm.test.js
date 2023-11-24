import React from 'react';
import { render } from '@testing-library/react';
import EditPatternForm from '../../components/forms/EditPatternForm';
import '@testing-library/jest-dom/extend-expect';

jest.mock('../../api/api', () => ({
    getLotacoes: jest.fn(),
    createUser: jest.fn(),
}));

describe('EditPatternForm', () => {
    it('should render without crashing', () => {
      render(<EditPatternForm />);
    });
});

  