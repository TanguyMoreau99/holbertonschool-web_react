import { render, screen } from '@testing-library/react';
import App from './App';

describe('App component', () => {
  test('renders without crashing', () => {
    render(<App />);
  });

  test('should render Login component when isLoggedIn is false', () => {
    const { container } = render(<App />);
    const loginDiv = container.querySelector('.App-body');
    expect(loginDiv).toBeInTheDocument();
    expect(screen.getByText(/login to access the full dashboard/i)).toBeInTheDocument();
  });
});
