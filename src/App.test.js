import { render, screen } from '@testing-library/react';
import Home from './pages/Home';

test('renders learn react link', () => {
  render(<Home />);
  const linkElement = screen.getByText(/hello world/i);
  expect(linkElement).toBeInTheDocument();
});
