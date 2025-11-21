import { render, screen } from '@testing-library/react';
import Header from './Header';

describe('Header component', () => {
  test('renders without crashing', () => {
    render(<Header />);
  });

  test('renders img and h1 tags', () => {
    render(<Header />);
    
    const logo = screen.getByAltText('holberton logo');
    expect(logo).toBeInTheDocument();
    
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading.textContent).toBe('School dashboard');
  });
});
