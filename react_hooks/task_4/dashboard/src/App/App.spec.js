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
    
    // Mock the axios calls
    mockAxios.mockResponse({ data: [] }); // notifications
  });

  test('fetches notifications data on mount', async () => {
    render(<App />);
    
    const notificationsData = [
      { id: 1, type: 'default', value: 'New course available' },
      { id: 2, type: 'urgent', value: 'New resume available' },
    ];
    
    // Resolve the notifications request
    mockAxios.mockResponse({ data: notificationsData });
    
    // Verify axios was called with correct URL
    expect(mockAxios.get).toHaveBeenCalledWith('/notifications.json');
    
    // Open the notifications drawer to verify data was loaded
    await waitFor(() => {
      const menuItem = screen.getByText(/your notifications/i).closest('.menuItem');
      expect(menuItem).toBeInTheDocument();
    });
  });

  test('fetches courses data when user state changes', async () => {
    const user = userEvent.setup();
    render(<App />);
    
    // Mock initial requests
    mockAxios.mockResponse({ data: [] }); // notifications
    mockAxios.mockResponse({ data: [] }); // initial courses
    
    // Log in
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByDisplayValue(/ok/i);
    
    await user.type(emailInput, 'test@example.com');
    await user.type(passwordInput, 'password123');
    await user.click(submitButton);
    
    const coursesData = [
      { id: 1, name: 'ES6', credit: 60 },
      { id: 2, name: 'Webpack', credit: 20 },
    ];
    
    // Resolve the courses request triggered by user state change
    mockAxios.mockResponse({ data: coursesData });
    
    // Verify courses were fetched
    await waitFor(() => {
      expect(mockAxios.get).toHaveBeenCalledWith('/courses.json');
    });
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

  test('handleDisplayDrawer sets displayDrawer to true', async () => {
    const user = userEvent.setup();
    const { container } = render(<App />);
    
    mockAxios.mockResponse({ data: [] }); // notifications
    
    // Initially drawer is closed
    expect(container.querySelector('.Notifications')).not.toBeInTheDocument();
    
    // Click to open drawer
    await waitFor(() => {
      const menuItem = screen.getByText(/your notifications/i).closest('.menuItem');
      expect(menuItem).toBeInTheDocument();
    });
    
    const menuItem = screen.getByText(/your notifications/i).closest('.menuItem');
    await user.click(menuItem);
    
    // Drawer should be open
    await waitFor(() => {
      expect(container.querySelector('.Notifications')).toBeInTheDocument();
    });
  });

  test('handleHideDrawer sets displayDrawer to false', async () => {
    const user = userEvent.setup();
    const { container } = render(<App />);
    
    mockAxios.mockResponse({ data: [] }); // notifications
    
    // Open drawer first
    await waitFor(() => {
      const menuItem = screen.getByText(/your notifications/i).closest('.menuItem');
      expect(menuItem).toBeInTheDocument();
    });
    
    const menuItem = screen.getByText(/your notifications/i).closest('.menuItem');
    await user.click(menuItem);
    
    await waitFor(() => {
      expect(container.querySelector('.Notifications')).toBeInTheDocument();
    });
    
    // Close drawer
    const closeButton = screen.getByLabelText(/close/i);
    await user.click(closeButton);
    
    // Drawer should be closed
    await waitFor(() => {
      expect(container.querySelector('.Notifications')).not.toBeInTheDocument();
    });
  });

  test('logIn function updates user state correctly', async () => {
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

  test('logOut function resets user state correctly', async () => {
    const user = userEvent.setup();
    render(<App />);
    
    mockAxios.mockResponse({ data: [] }); // notifications
    mockAxios.mockResponse({ data: [] }); // initial courses
    
    // Log in first
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
    
    // Verify logged in
    await waitFor(() => {
      expect(screen.getByText(/welcome test@example.com/i)).toBeInTheDocument();
    });
    
    // Click logout
    const logoutLink = screen.getByText(/logout/i);
    await user.click(logoutLink);
    
    mockAxios.mockResponse({ data: [] }); // courses after logout
    
    // Should show Login again and no welcome message
    await waitFor(() => {
      expect(screen.getByText(/login to access the full dashboard/i)).toBeInTheDocument();
      expect(screen.queryByText(/welcome test@example.com/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/course list/i)).not.toBeInTheDocument();
    });
  });

  test('clicking on notification removes it and logs message', async () => {
    const user = userEvent.setup();
    render(<App />);
    
    const notificationsData = [
      { id: 1, type: 'default', value: 'New course available' },
    ];
    
    mockAxios.mockResponse({ data: notificationsData }); // notifications
    
    // Open notifications drawer
    await waitFor(() => {
      const menuItem = screen.getByText(/your notifications/i).closest('.menuItem');
      expect(menuItem).toBeInTheDocument();
    });
    
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
