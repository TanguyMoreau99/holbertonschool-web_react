import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('App component', () => {
  let alertSpy;

  beforeEach(() => {
    alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});
  });

  afterEach(() => {
    alertSpy.mockRestore();
  });

  test('renders without crashing', () => {
    render(<App />);
  });

  test('default state shows Login component', () => {
    render(<App />);
    const loginText = screen.getByText(/login to access the full dashboard/i);
    expect(loginText).toBeInTheDocument();
  });

  test('default state for displayDrawer is false', () => {
    const { container } = render(<App />);
    const notificationsDiv = container.querySelector('.Notifications');
    expect(notificationsDiv).not.toBeInTheDocument();
  });

  test('default state for user.isLoggedIn is false', () => {
    render(<App />);
    const loginText = screen.getByText(/login to access the full dashboard/i);
    expect(loginText).toBeInTheDocument();
    
    const { container } = render(<App />);
    const logoutSection = container.querySelector('#logoutSection');
    expect(logoutSection).not.toBeInTheDocument();
  });

  test('displays News from the School title and paragraph', () => {
    render(<App />);
    
    const newsTitle = screen.getByText(/news from the school/i);
    expect(newsTitle).toBeInTheDocument();
    
    const newsParagraph = screen.getByText(/ipsum lorem ipsum/i);
    expect(newsParagraph).toBeInTheDocument();
  });

  test('pressing ctrl+h calls logOut and shows alert', () => {
    render(<App />);

    const event = new KeyboardEvent('keydown', {
      ctrlKey: true,
      key: 'h',
      bubbles: true,
    });

    window.dispatchEvent(event);

    expect(alertSpy).toHaveBeenCalledWith('Logging you out');
  });

  test('logIn function updates state and shows CourseList', async () => {
    const user = userEvent.setup();
    render(<App />);
    
    // Initially shows Login
    expect(screen.getByText(/login to access the full dashboard/i)).toBeInTheDocument();
    
    // Fill in login form
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByDisplayValue(/ok/i);
    
    await user.type(emailInput, 'test@example.com');
    await user.type(passwordInput, 'password123');
    await user.click(submitButton);
    
    // Should now show CourseList
    await waitFor(() => {
      expect(screen.queryByText(/login to access the full dashboard/i)).not.toBeInTheDocument();
      expect(screen.getByText(/course list/i)).toBeInTheDocument();
    });
  });

  test('logOut function resets state and shows Login', async () => {
    const user = userEvent.setup();
    render(<App />);
    
    // Log in first
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByDisplayValue(/ok/i);
    
    await user.type(emailInput, 'test@example.com');
    await user.type(passwordInput, 'password123');
    await user.click(submitButton);
    
    // Verify logged in
    await waitFor(() => {
      expect(screen.getByText(/welcome test@example.com/i)).toBeInTheDocument();
    });
    
    // Click logout
    const logoutLink = screen.getByText(/logout/i);
    await user.click(logoutLink);
    
    // Should show Login again
    await waitFor(() => {
      expect(screen.getByText(/login to access the full dashboard/i)).toBeInTheDocument();
      expect(screen.queryByText(/welcome test@example.com/i)).not.toBeInTheDocument();
    });
  });
});
