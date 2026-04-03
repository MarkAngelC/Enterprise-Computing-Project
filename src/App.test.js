import { render, screen } from '@testing-library/react';
import App from './App';

test('renders group info and all team member names', () => {
  render(<App />);

  expect(screen.getByRole('heading', { name: /enterprise computing project/i })).toBeInTheDocument();
  expect(screen.getByText(/group number:/i)).toBeInTheDocument();

  expect(screen.getByText('Mark Castro')).toBeInTheDocument();
  expect(screen.getByText('Dondon Herrera')).toBeInTheDocument();
  expect(screen.getByText('Victor Leung')).toBeInTheDocument();
  expect(screen.getByText('Joy Francisco')).toBeInTheDocument();
});
