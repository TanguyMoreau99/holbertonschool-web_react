import { render } from '@testing-library/react';
import Header from './Header';

describe('Header component', () => {
  test('renders without crashing', () => {
    render(<Header />);
  });
});
