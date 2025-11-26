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
    const logOutMock = jest.fn();
    render(<App logOut={logOutMock} />);

    const event = new KeyboardEvent('keydown', {
      ctrlKey: true,
      key: 'h',
      bubbles: true,
    });

    window.dispatchEvent(event);

    expect(logOutMock).toHaveBeenCalledTimes(1);
    expect(alertSpy).toHaveBeenCalledWith('Logging you out');
  });

  test('alert function is called with the string "Logging you out"', () => {
    const logOutMock = jest.fn();
    render(<App logOut={logOutMock} />);

    const event = new KeyboardEvent('keydown', {
      ctrlKey: true,
      key: 'h',
      bubbles: true,
    });

    window.dispatchEvent(event);

    expect(alertSpy).toHaveBeenCalledWith('Logging you out');
  });

  test('displays News from the School title and paragraph by default', () => {
    render(<App />);
    
    const newsTitle = screen.getByText(/news from the school/i);
    expect(newsTitle).toBeInTheDocument();
    
    const newsParagraph = screen.getByText(/holberton school news goes here/i);
    expect(newsParagraph).toBeInTheDocument();
  });

  test('displays CourseList when isLoggedIn is true', () => {
    render(<App />);
    
    const courseListTable = document.getElementById('CourseList');
    expect(courseListTable).toBeInTheDocument();
  });
});
