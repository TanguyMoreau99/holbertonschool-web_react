import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Notifications from './Notifications';

describe('Notifications component', () => {
  const defaultProps = {
    displayDrawer: false,
    notifications: [],
    handleDisplayDrawer: jest.fn(),
    handleHideDrawer: jest.fn(),
    markNotificationAsRead: jest.fn(),
  };

  test('renders without crashing', () => {
    render(<Notifications {...defaultProps} />);
  });

  test('renders the menu item when displayDrawer is false', () => {
    render(<Notifications {...defaultProps} />);
    expect(screen.getByText(/your notifications/i)).toBeInTheDocument();
  });

  test('does not render notifications div when displayDrawer is false', () => {
    const { container } = render(<Notifications {...defaultProps} />);
    const notificationsDiv = container.querySelector('.Notifications');
    expect(notificationsDiv).not.toBeInTheDocument();
  });

  test('renders notifications div when displayDrawer is true', () => {
    const { container } = render(<Notifications {...defaultProps} displayDrawer={true} />);
    const notificationsDiv = container.querySelector('.Notifications');
    expect(notificationsDiv).toBeInTheDocument();
  });

  test('renders correctly with empty notifications array', () => {
    render(<Notifications {...defaultProps} displayDrawer={true} />);
    expect(screen.getByText(/no new notification for now/i)).toBeInTheDocument();
  });

  test('renders correctly with notifications array', () => {
    const notifications = [
      { id: 1, type: 'default', value: 'New course available' },
      { id: 2, type: 'urgent', value: 'New resume available' },
      { id: 3, type: 'urgent', html: { __html: '<strong>Urgent requirement</strong>' } },
    ];
    render(<Notifications {...defaultProps} displayDrawer={true} notifications={notifications} />);
    expect(screen.getByText(/here is the list of notifications/i)).toBeInTheDocument();
  });

  test('clicking on menu item calls handleDisplayDrawer', async () => {
    const user = userEvent.setup();
    const handleDisplayDrawer = jest.fn();
    render(<Notifications {...defaultProps} handleDisplayDrawer={handleDisplayDrawer} />);
    
    const menuItem = screen.getByText(/your notifications/i).closest('.menuItem');
    await user.click(menuItem);
    
    expect(handleDisplayDrawer).toHaveBeenCalledTimes(1);
  });

  test('clicking on close button calls handleHideDrawer', async () => {
    const user = userEvent.setup();
    const handleHideDrawer = jest.fn();
    render(<Notifications {...defaultProps} displayDrawer={true} handleHideDrawer={handleHideDrawer} />);
    
    const closeButton = screen.getByLabelText(/close/i);
    await user.click(closeButton);
    
    expect(handleHideDrawer).toHaveBeenCalledTimes(1);
  });

  test('clicking on notification item calls markNotificationAsRead', async () => {
    const user = userEvent.setup();
    const markNotificationAsRead = jest.fn();
    const notifications = [
      { id: 1, type: 'default', value: 'New course available' },
    ];
    
    render(<Notifications {...defaultProps} displayDrawer={true} notifications={notifications} markNotificationAsRead={markNotificationAsRead} />);
    
    const notificationItem = screen.getByText(/new course available/i);
    await user.click(notificationItem);
    
    expect(markNotificationAsRead).toHaveBeenCalledWith(1);
    expect(markNotificationAsRead).toHaveBeenCalledTimes(1);
  });
});
