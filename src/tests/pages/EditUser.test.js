import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import EditUserPage from '../../pages/EditUser';
import EditUserForm from '../../components/forms/EditUserForm';
import { BrowserRouter } from 'react-router-dom';



// Optionally, you can mock child components if their internal functionality is not relevant for the current test
jest.mock("../../components/navbar/Navbar", () => (props) => <div data-testid="navbar-mock">Navbar</div>);
jest.mock("../../components/forms/EditUserForm", () => (props) => <div data-testid="edit-user-form-mock">EditUserForm</div>);

describe('EditUserPage Tests', () => {
  test('renders EditUserPage with all components', () => {
    render(<EditUserPage />);

    // Check if Navbar is rendered
    expect(screen.getByTestId('navbar-mock')).toBeInTheDocument();

    // Check if EditUserForm is rendered
    expect(screen.getByTestId('edit-user-form-mock')).toBeInTheDocument();

    // Check if the image is rendered
    expect(screen.getByRole('img')).toHaveAttribute('src', 'signup_image.svg');
  });

});

test('EditUserForm renders correctly', () => {
  const wrapper = render(
    <BrowserRouter>
      <EditUserPage>
        <EditUserForm />
      </EditUserPage>
    </BrowserRouter>
    
    );
  expect(wrapper.baseElement).toBeInTheDocument()
});
