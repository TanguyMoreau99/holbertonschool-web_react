import { render, screen } from '@testing-library/react';
import BodySectionWithMarginBottom from './BodySectionWithMarginBottom';

describe('BodySectionWithMarginBottom component', () => {
  test('renders without crashing', () => {
    render(<BodySectionWithMarginBottom title="test title" />);
  });

  test('renders a div with the class bodySectionWithMargin', () => {
    const { container } = render(
      <BodySectionWithMarginBottom title="test title">
        <p>test children node</p>
      </BodySectionWithMarginBottom>
    );
    
    const divWithMargin = container.querySelector('.bodySectionWithMargin');
    expect(divWithMargin).toBeInTheDocument();
  });

  test('renders the BodySection component correctly', () => {
    const { container } = render(
      <BodySectionWithMarginBottom title="test title">
        <p>test children node</p>
      </BodySectionWithMarginBottom>
    );
    
    const bodySection = container.querySelector('.bodySection');
    expect(bodySection).toBeInTheDocument();
    
    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toBeInTheDocument();
    expect(heading.textContent).toBe('test title');
    
    const paragraph = screen.getByText('test children node');
    expect(paragraph).toBeInTheDocument();
  });
});
