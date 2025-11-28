import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Header from './Header';
import AppContext from '../Context/context';

describe('Header component', () => {
  test('renders without crashing', () => {
    render(<Header />);
  });

  test('renders img and h1 tags', () => {
    render(<Header />);
    
    const img = screen.getByAltText(/holberton logo/i);
    const heading = screen.getByRole('heading', { level: 1 });
    
    expect(img).toBeInTheDocument();
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(/school dashboard/i);
  });

  test('does not render logoutSection with default context value', () => {
    const { container } = render(<Header />);
    const logoutSection = container.querySelector('#logoutSection');
    
    expect(logoutSection).not.toBeInTheDocument();
  });

  test('renders logoutSection when user is logged in', () => {
    const contextValue = {
      user: {
        email: 'test@example.com',
        password: 'password123',
        isLoggedIn: true,
      },
      logOut: jest.fn(),
    };
    
    const { container } = render(
      <AppContext.Provider value={contextValue}>
        <Header />
      </AppContext.Provider>
    );
    
    const logoutSection = container.querySelector('#logoutSection');
    expect(logoutSection).toBeInTheDocument();
    expect(screen.getByText(/welcome test@example.com/i)).toBeInTheDocument();
  });

  test('clicking logout link calls logOut function', async () => {
    const user = userEvent.setup();
    const logOutSpy = jest.fn();
    const contextValue = {
      user: {
        email: 'test@example.com',
        password: 'password123',
        isLoggedIn: true,
      },
      logOut: logOutSpy,
    };
    
    render(
      <AppContext.Provider value={contextValue}>
        <Header />
      </AppContext.Provider>
    );
    
    const logoutLink = screen.getByText(/logout/i);
    await user.click(logoutLink);
    
    expect(logOutSpy).toHaveBeenCalledTimes(1);
  });
});
