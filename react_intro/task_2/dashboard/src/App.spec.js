import { render, screen } from '@testing-library/react';
import App from './App';

describe('App component', () => {
  test('renders h1 with text School dashboard', () => {
    render(<App />);
    const h1Element = screen.getByRole('heading', { 
      name: /school dashboard/i, 
      level: 1 
    });
    expect(h1Element).toBeInTheDocument();
  });

  test('renders paragraph with login text in App-body', () => {
    render(<App />);
    const bodyText = screen.getByText(/login to access the full dashboard/i);
    expect(bodyText).toBeInTheDocument();
  });

  test('renders paragraph with copyright text in App-footer', () => {
    render(<App />);
    const currentYear = new Date().getFullYear();
    const footerText = screen.getByText(
      new RegExp(`copyright ${currentYear} - holberton school main dashboard`, 'i')
    );
    expect(footerText).toBeInTheDocument();
  });

  test('renders an image with alt text holberton logo', () => {
    render(<App />);
    const imgElement = screen.getByAltText(/holberton logo/i);
    expect(imgElement).toBeInTheDocument();
  });

  test('renders Notifications component', () => {
    render(<App />);
    const notificationText = screen.getByText(/here is the list of notifications/i);
    expect(notificationText).toBeInTheDocument();
  });

  test('renders email input field', () => {
    render(<App />);
    const emailInput = screen.getByLabelText(/email/i);
    expect(emailInput).toBeInTheDocument();
    expect(emailInput).toHaveAttribute('type', 'email');
  });

  test('renders password input field', () => {
    render(<App />);
    const passwordInput = screen.getByLabelText(/password/i);
    expect(passwordInput).toBeInTheDocument();
    expect(passwordInput).toHaveAttribute('type', 'password');
  });

  test('renders OK button', () => {
    render(<App />);
    const button = screen.getByRole('button', { name: /ok/i });
    expect(button).toBeInTheDocument();
  });
});