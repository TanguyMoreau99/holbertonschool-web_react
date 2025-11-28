import { render, screen } from '@testing-library/react';
import Footer from './Footer';

describe('Footer component', () => {
  const defaultUser = {
    email: '',
    password: '',
    isLoggedIn: false,
  };

  test('renders without crashing', () => {
    render(<Footer user={defaultUser} />);
  });

  test('renders copyright text', () => {
    render(<Footer user={defaultUser} />);
    const copyrightText = screen.getByText(/copyright/i);
    expect(copyrightText).toBeInTheDocument();
  });

  test('does not display Contact us link when user is logged out', () => {
    render(<Footer user={defaultUser} />);

    const contactLink = screen.queryByText(/contact us/i);
    expect(contactLink).not.toBeInTheDocument();
  });

  test('displays Contact us link when user is logged in', () => {
    const loggedInUser = {
      email: 'test@example.com',
      password: 'password123',
      isLoggedIn: true,
    };

    render(<Footer user={loggedInUser} />);

    const contactLink = screen.getByText(/contact us/i);
    expect(contactLink).toBeInTheDocument();
    expect(contactLink.tagName).toBe('A');
  });
});
