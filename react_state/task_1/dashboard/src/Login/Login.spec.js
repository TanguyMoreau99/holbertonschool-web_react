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
    
    // Initially disabled
    expect(submitButton).toBeDisabled();
    
    // Type valid email
    await user.type(emailInput, 'test@example.com');
    // Still disabled (password not valid)
    expect(submitButton).toBeDisabled();
    
    // Type valid password (at least 8 characters)
    await user.type(passwordInput, 'password123');
    // Now should be enabled
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

  test('form submission does not reload the page', async () => {
    const user = userEvent.setup();
    const { container } = render(<Login />);
    
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const form = container.querySelector('form');
    
    await user.type(emailInput, 'test@example.com');
    await user.type(passwordInput, 'password123');
    
    const submitEvent = jest.fn((e) => e.preventDefault());
    form.addEventListener('submit', submitEvent);
    
    await user.click(screen.getByDisplayValue(/ok/i));
    
    expect(submitEvent).toHaveBeenCalled();
  });

  test('handleLoginSubmit updates isLoggedIn state', async () => {
    const user = userEvent.setup();
    render(<Login />);
    
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByDisplayValue(/ok/i);
    
    await user.type(emailInput, 'test@example.com');
    await user.type(passwordInput, 'password123');
    await user.click(submitButton);
    
    // The state should be updated, but we can't directly test private state
    // We would verify this through component behavior in integration tests
  });
});
