import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from './Login';

describe('Login component', () => {
  test('renders without crashing', () => {
    render(<Login />);
  });

  test('renders 2 input tags and 2 label tags', () => {
    render(<Login />);
    
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(emailInput.tagName).toBe('INPUT');
    expect(passwordInput.tagName).toBe('INPUT');
  });

  test('submit button is disabled by default', () => {
    render(<Login />);
    const submitButton = screen.getByDisplayValue(/ok/i);
    
    expect(submitButton).toBeDisabled();
  });

  test('submit button is enabled after filling valid email and password', async () => {
    const user = userEvent.setup();
    render(<Login />);
    
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByDisplayValue(/ok/i);
    
    expect(submitButton).toBeDisabled();
    
    await user.type(emailInput, 'test@example.com');
    expect(submitButton).toBeDisabled();
    
    await user.type(passwordInput, 'password123');
    expect(submitButton).toBeEnabled();
  });

  test('submit button remains disabled with invalid email', async () => {
    const user = userEvent.setup();
    render(<Login />);
    
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByDisplayValue(/ok/i);
    
    await user.type(emailInput, 'invalidemail');
    await user.type(passwordInput, 'password123');
    
    expect(submitButton).toBeDisabled();
  });

  test('submit button remains disabled with short password', async () => {
    const user = userEvent.setup();
    render(<Login />);
    
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByDisplayValue(/ok/i);
    
    await user.type(emailInput, 'test@example.com');
    await user.type(passwordInput, 'pass');
    
    expect(submitButton).toBeDisabled();
  });

  test('logIn method is called with email and password when form is submitted', async () => {
    const user = userEvent.setup();
    const logInMock = jest.fn();
    render(<Login logIn={logInMock} />);
    
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByDisplayValue(/ok/i);
    
    await user.type(emailInput, 'test@example.com');
    await user.type(passwordInput, 'password123');
    await user.click(submitButton);
    
    expect(logInMock).toHaveBeenCalledWith('test@example.com', 'password123');
    expect(logInMock).toHaveBeenCalledTimes(1);
  });
});
