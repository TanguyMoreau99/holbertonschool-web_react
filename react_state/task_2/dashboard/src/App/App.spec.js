import { render, screen } from '@testing-library/react';
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

  test('calls logOut and displays alert when ctrl+h is pressed', () => {
    render(<App />);

    const event = new KeyboardEvent('keydown', {
      ctrlKey: true,
      key: 'h',
      bubbles: true,
    });

    window.dispatchEvent(event);

    expect(alertSpy).toHaveBeenCalledWith('Logging you out');
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
  });

  test('displays News from the School title and paragraph', () => {
    render(<App />);
    
    const newsTitle = screen.getByText(/news from the school/i);
    expect(newsTitle).toBeInTheDocument();
    
    const newsParagraph = screen.getByText(/ipsum lorem ipsum/i);
    expect(newsParagraph).toBeInTheDocument();
  });
});
