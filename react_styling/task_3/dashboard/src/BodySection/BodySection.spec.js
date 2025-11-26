import { render, screen } from '@testing-library/react';
import BodySection from './BodySection';

describe('BodySection component', () => {
  test('renders without crashing', () => {
    render(<BodySection title="test title" />);
  });

  test('renders correct h2 element with the title prop', () => {
    render(<BodySection title="test title"><p>test children node</p></BodySection>);
    
    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toBeInTheDocument();
    expect(heading.textContent).toBe('test title');
  });

  test('renders the children correctly', () => {
    render(
      <BodySection title="test title">
        <p>test children node</p>
      </BodySection>
    );
    
    const paragraph = screen.getByText('test children node');
    expect(paragraph).toBeInTheDocument();
  });

  test('renders multiple children correctly', () => {
    render(
      <BodySection title="test title">
        <p>First child</p>
        <p>Second child</p>
        <span>Third child</span>
      </BodySection>
    );
    
    expect(screen.getByText('First child')).toBeInTheDocument();
    expect(screen.getByText('Second child')).toBeInTheDocument();
    expect(screen.getByText('Third child')).toBeInTheDocument();
  });
});
