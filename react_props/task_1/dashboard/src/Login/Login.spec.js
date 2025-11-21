import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from './Login';

describe('Login component', () => {
  test('renders without crashing', () => {
    render(<Login />);
  });

  test('renders 2 input tags and 2 label tags', () => {
    render(<Login />);
    
    const emailLabel = screen.getByText(/email:/i);
    const passwordLabel = screen.getByText(/password:/i);
    expect(emailLabel).toBeInTheDocument();
    expect(passwordLabel).toBeInTheDocument();
    
    const emailInput = screen.getByLabelText(/email:/i);
    const passwordInput = screen.getByLabelText(/password:/i);
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    
    const button = screen.getByRole('button', { name: /ok/i });
    expect(button).toBeInTheDocument();
  });

  test('inputs get focused when labels are clicked', async () => {
    const user = userEvent.setup();
    render(<Login />);
    
    const emailInput = screen.getByLabelText(/email:/i);
    const passwordInput = screen.getByLabelText(/password:/i);
    
    const emailLabel = screen.getByText(/email:/i);
    const passwordLabel = screen.getByText(/password:/i);
    
    await user.click(emailLabel);
    expect(emailInput).toHaveFocus();
    
    await user.click(passwordLabel);
    expect(passwordInput).toHaveFocus();
  });
});
