import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Header from './Header';

describe('Header component', () => {
  const defaultUser = {
    email: '',
    password: '',
    isLoggedIn: false,
  };

  test('renders without crashing', () => {
    render(<Header user={defaultUser} />);
  });

  test('renders img and h1 tags', () => {
    render(<Header user={defaultUser} />);
    
    const img = screen.getByAltText(/holberton logo/i);
    const heading = screen.getByRole('heading', { level: 1 });
    
    expect(img).toBeInTheDocument();
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(/school dashboard/i);
  });

  test('does not render logoutSection when user is not logged in', () => {
    const { container } = render(<Header user={defaultUser} />);
    const logoutSection = container.querySelector('#logoutSection');
    
    expect(logoutSection).not.toBeInTheDocument();
  });

  test('renders logoutSection when user is logged in', () => {
    const loggedInUser = {
      email: 'test@example.com',
      password: 'password123',
      isLoggedIn: true,
    };
    
    const { container } = render(<Header user={loggedInUser} logOut={jest.fn()} />);
    
    const logoutSection = container.querySelector('#logoutSection');
    expect(logoutSection).toBeInTheDocument();
    expect(screen.getByText(/welcome test@example.com/i)).toBeInTheDocument();
  });

  test('clicking logout link calls logOut function', async () => {
    const user = userEvent.setup();
    const logOutSpy = jest.fn();
    const loggedInUser = {
      email: 'test@example.com',
      password: 'password123',
      isLoggedIn: true,
    };
    
    render(<Header user={loggedInUser} logOut={logOutSpy} />);
    
    const logoutLink = screen.getByText(/logout/i);
    await user.click(logoutLink);
    
    expect(logOutSpy).toHaveBeenCalledTimes(1);
  });
});
