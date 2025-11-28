import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('App component', () => {
  let alertSpy;
  let consoleSpy;

  beforeEach(() => {
    alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});
    consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    alertSpy.mockRestore();
    consoleSpy.mockRestore();
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
    
    expect(screen.getByText(/login to access the full dashboard/i)).toBeInTheDocument();
    
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByDisplayValue(/ok/i);
    
    await user.type(emailInput, 'test@example.com');
    await user.type(passwordInput, 'password123');
    await user.click(submitButton);
    
    await waitFor(() => {
      expect(screen.queryByText(/login to access the full dashboard/i)).not.toBeInTheDocument();
      expect(screen.getByText(/course list/i)).toBeInTheDocument();
    });
  });

  test('clicking on notification removes it and logs message', async () => {
    const user = userEvent.setup();
    render(<App />);
    
    // Open notifications drawer
    const menuItem = screen.getByText(/your notifications/i).closest('.menuItem');
    await user.click(menuItem);
    
    // Wait for notifications to appear
    await waitFor(() => {
      expect(screen.getByText(/new course available/i)).toBeInTheDocument();
    });
    
    // Click on first notification
    const notification = screen.getByText(/new course available/i);
    await user.click(notification);
    
    // Verify console log
    expect(consoleSpy).toHaveBeenCalledWith('Notification 1 has been marked as read');
    
    // Verify notification is removed
    await waitFor(() => {
      expect(screen.queryByText(/new course available/i)).not.toBeInTheDocument();
    });
  });
});
