import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('App component', () => {
  let consoleSpy;

  beforeEach(() => {
    consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
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

  test('handleDisplayDrawer sets displayDrawer to true', async () => {
    const user = userEvent.setup();
    const { container } = render(<App />);
    
    // Initially drawer is closed
    expect(container.querySelector('.Notifications')).not.toBeInTheDocument();
    
    // Click to open drawer
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
    
    // Open drawer first
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
      expect(screen.getByText(/welcome test@example.com/i)).toBeInTheDocument();
    });
  });

  test('logOut function resets user state correctly', async () => {
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

  test('markNotificationAsRead removes notification from state', async () => {
    const user = userEvent.setup();
    render(<App />);
    
    // Open drawer
    const menuItem = screen.getByText(/your notifications/i).closest('.menuItem');
    await user.click(menuItem);
    
    await waitFor(() => {
      expect(screen.getAllByRole('listitem')).toHaveLength(3);
    });
    
    // Click on a notification
    const notification = screen.getByText(/new course available/i);
    await user.click(notification);
    
    // Should have 2 notifications left
    await waitFor(() => {
      expect(screen.getAllByRole('listitem')).toHaveLength(2);
    });
  });
});
