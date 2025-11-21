import { render, screen } from '@testing-library/react';
import Header from './Header';

describe('Header component', () => {
  test('renders without crashing', () => {
    render(<Header />);
  });

  test('renders img and h1 tags', () => {
    render(<Header />);
    
    const logo = screen.getByAltText(/holberton logo/i);
    expect(logo).toBeInTheDocument();
    
    const heading = screen.getByText(/School dashboard/i);
    expect(heading).toBeInTheDocument();
  });
});
