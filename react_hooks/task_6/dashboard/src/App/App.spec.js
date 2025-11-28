import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import mockAxios from 'jest-mock-axios';
import App from './App';

describe('App component', () => {
  let consoleSpy;

  beforeEach(() => {
    consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleSpy.mockRestore();
    mockAxios.reset();
  });

  test('renders without crashing', () => {
    render(<App />);
    
    mockAxios.mockResponse({ data: [] }); // notifications
  });

  test('default state shows Login component', async () => {
    render(<App />);
    
    mockAxios.mockResponse({ data: [] }); // notifications
    mockAxios.mockResponse({ data: [] }); // courses
    
    await waitFor(() => {
      const loginText = screen.getByText(/login to access the full dashboard/i);
      expect(loginText).toBeInTheDocument();
    });
  });

  test('handleDisplayDrawer toggles displayDrawer to true', async () => {
    const user = userEvent.setup();
    const { container } = render(<App />);
    
    mockAxios.mockResponse({ data: [] }); // notifications
    
    expect(container.querySelector('.Notifications')).not.toBeInTheDocument();
    
    await waitFor(() => {
      const menuItem = screen.getByText(/your notifications/i).closest('.menuItem');
      expect(menuItem).toBeInTheDocument();
    });
    
    const menuItem = screen.getByText(/your notifications/i).closest('.menuItem');
    await user.click(menuItem);
    
    await waitFor(() => {
      expect(container.querySelector('.Notifications')).toBeInTheDocument();
    });
  });

  test('handleHideDrawer toggles displayDrawer to false', async () => {
    const user = userEvent.setup();
    const { container } = render(<App />);
    
    mockAxios.mockResponse({ data: [] }); // notifications
    
    await waitFor(() => {
      const menuItem = screen.getByText(/your notifications/i).closest('.menuItem');
      expect(menuItem).toBeInTheDocument();
    });
    
    const menuItem = screen.getByText(/your notifications/i).closest('.menuItem');
    await user.click(menuItem);
    
    await waitFor(() => {
      expect(container.querySelector('.Notifications')).toBeInTheDocument();
    });
    
    const closeButton = screen.getByLabelText(/close/i);
    await user.click(closeButton);
    
    await waitFor(() => {
      expect(container.querySelector('.Notifications')).not.toBeInTheDocument();
    });
  });

  test('logIn action updates user state correctly', async () => {
    const user = userEvent.setup();
    render(<App />);
    
    mockAxios.mockResponse({ data: [] }); // notifications
    mockAxios.mockResponse({ data: [] }); // initial courses
    
    await waitFor(() => {
      expect(screen.getByText(/login to access the full dashboard/i)).toBeInTheDocument();
    });
    
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByDisplayValue(/ok/i);
    
    await user.type(emailInput, 'test@example.com');
    await user.type(passwordInput, 'password123');
    await user.click(submitButton);
    
    mockAxios.mockResponse({ data: [] }); // courses after login
    
    await waitFor(() => {
      expect(screen.queryByText(/login to access the full dashboard/i)).not.toBeInTheDocument();
      expect(screen.getByText(/course list/i)).toBeInTheDocument();
      expect(screen.getByText(/welcome test@example.com/i)).toBeInTheDocument();
    });
  });

  test('logOut action resets user state correctly', async () => {
    const user = userEvent.setup();
    render(<App />);
    
    mockAxios.mockResponse({ data: [] }); // notifications
    mockAxios.mockResponse({ data: [] }); // initial courses
    
    await waitFor(() => {
      const emailInput = screen.getByLabelText(/email/i);
      expect(emailInput).toBeInTheDocument();
    });
    
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByDisplayValue(/ok/i);
    
    await user.type(emailInput, 'test@example.com');
    await user.type(passwordInput, 'password123');
    await user.click(submitButton);
    
    mockAxios.mockResponse({ data: [] }); // courses after login
    
    await waitFor(() => {
      expect(screen.getByText(/welcome test@example.com/i)).toBeInTheDocument();
    });
    
    const logoutLink = screen.getByText(/logout/i);
    await user.click(logoutLink);
    
    mockAxios.mockResponse({ data: [] }); // courses after logout
    
    await waitFor(() => {
      expect(screen.getByText(/login to access the full dashboard/i)).toBeInTheDocument();
      expect(screen.queryByText(/welcome test@example.com/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/course list/i)).not.toBeInTheDocument();
    });
  });

  test('markNotificationAsRead action removes notification from state', async () => {
    const user = userEvent.setup();
    render(<App />);
    
    const notificationsData = [
      { id: 1, type: 'default', value: 'New course available' },
      { id: 2, type: 'urgent', value: 'New resume available' },
    ];
    
    mockAxios.mockResponse({ data: notificationsData }); // notifications
    
    await waitFor(() => {
      const menuItem = screen.getByText(/your notifications/i).closest('.menuItem');
      expect(menuItem).toBeInTheDocument();
    });
    
    const menuItem = screen.getByText(/your notifications/i).closest('.menuItem');
    await user.click(menuItem);
    
    await waitFor(() => {
      expect(screen.getByText(/new course available/i)).toBeInTheDocument();
    });
    
    const notification = screen.getByText(/new course available/i);
    await user.click(notification);
    
    expect(consoleSpy).toHaveBeenCalledWith('Notification 1 has been marked as read');
    
    await waitFor(() => {
      expect(screen.queryByText(/new course available/i)).not.toBeInTheDocument();
      expect(screen.getByText(/new resume available/i)).toBeInTheDocument();
    });
  });

  test('fetches and sets notifications on mount', async () => {
    render(<App />);
    
    const notificationsData = [
      { id: 1, type: 'default', value: 'New course available' },
    ];
    
    mockAxios.mockResponse({ data: notificationsData });
    
    expect(mockAxios.get).toHaveBeenCalledWith('/notifications.json');
  });

  test('fetches and sets courses when user state changes', async () => {
    const user = userEvent.setup();
    render(<App />);
    
    mockAxios.mockResponse({ data: [] }); // notifications
    mockAxios.mockResponse({ data: [] }); // initial courses
    
    await waitFor(() => {
      const emailInput = screen.getByLabelText(/email/i);
      expect(emailInput).toBeInTheDocument();
    });
    
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByDisplayValue(/ok/i);
    
    await user.type(emailInput, 'test@example.com');
    await user.type(passwordInput, 'password123');
    await user.click(submitButton);
    
    const coursesData = [
      { id: 1, name: 'ES6', credit: 60 },
    ];
    
    mockAxios.mockResponse({ data: coursesData });
    
    await waitFor(() => {
      expect(mockAxios.get).toHaveBeenCalledWith('/courses.json');
    });
  });
});
