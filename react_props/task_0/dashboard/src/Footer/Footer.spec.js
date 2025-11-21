import { render } from '@testing-library/react';
import Footer from './Footer';

describe('Footer component', () => {
  test('renders without crashing', () => {
    render(<Footer />);
  });
});
