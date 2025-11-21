import { render, screen } from '@testing-library/react';
import NotificationItem from './NotificationItem';

describe('NotificationItem component', () => {
  test('renders without crashing', () => {
    render(<NotificationItem type="default" value="test" />);
  });

  test('renders correct html with type and value props', () => {
    const { container } = render(
      <NotificationItem type="default" value="test" />
    );
    const li = container.querySelector('li');
    
    expect(li).toBeInTheDocument();
    expect(li).toHaveAttribute('data-notification-type', 'default');
    expect(li).toHaveStyle({ color: 'rgb(0, 0, 255)' });
    expect(li.textContent).toBe('test');
  });

  test('renders correct html with urgent type', () => {
    const { container } = render(
      <NotificationItem type="urgent" value="urgent test" />
    );
    const li = container.querySelector('li');
    
    expect(li).toBeInTheDocument();
    expect(li).toHaveAttribute('data-notification-type', 'urgent');
    expect(li).toHaveStyle({ color: 'rgb(255, 0, 0)' });
  });

  test('renders correct html with html prop', () => {
    const { container } = render(
      <NotificationItem 
        type="urgent" 
        html={{ __html: '<strong>test</strong>' }} 
      />
    );
    const li = container.querySelector('li');
    
    expect(li).toBeInTheDocument();
    expect(li.innerHTML).toBe('<strong>test</strong>');
  });
});
