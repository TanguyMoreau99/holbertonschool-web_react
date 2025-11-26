import { render, screen } from '@testing-library/react';
import Footer from './Footer';

describe('Footer component', () => {
  test('renders without crashing', () => {
    render(<Footer />);
  });

  test('renders the text "Copyright"', () => {
    render(<Footer />);
    
    const currentYear = new Date().getFullYear();
    const footerText = screen.getByText(new RegExp(`Copyright ${currentYear} - Holberton School`, 'i'));
    expect(footerText).toBeInTheDocument();
  });
});
