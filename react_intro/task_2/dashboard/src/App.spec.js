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

  test('renders 2 input elements', () => {
    render(<App />);
    const inputs = screen.getAllByRole('textbox').concat(
      screen.getAllByLabelText(/password/i)
    );
    expect(inputs).toHaveLength(2);
  });

  test('renders 2 label elements with text Email and Password', () => {
    render(<App />);
    const emailLabel = screen.getByText(/email/i);
    const passwordLabel = screen.getByText(/password/i);
    expect(emailLabel).toBeInTheDocument();
    expect(passwordLabel).toBeInTheDocument();
  });

  test('renders a button with text OK', () => {
    render(<App />);
    const button = screen.getByRole('button', { name: /ok/i });
    expect(button).toBeInTheDocument();
  });
});