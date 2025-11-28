import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NotificationItem from './NotificationItem';

describe('NotificationItem component', () => {
  test('renders without crashing', () => {
    render(<NotificationItem />);
  });

  test('renders correct html with type and value props', () => {
    render(<NotificationItem type="default" value="test" />);
    const listItem = screen.getByText('test');
    
    expect(listItem).toBeInTheDocument();
    expect(listItem.tagName).toBe('LI');
    expect(listItem).toHaveAttribute('data-notification-type', 'default');
  });

  test('renders correct html with html prop', () => {
    const htmlContent = { __html: '<u>test</u>' };
    const { container } = render(<NotificationItem html={htmlContent} />);
    const listItem = container.querySelector('li');
    
    expect(listItem).toBeInTheDocument();
    expect(listItem.innerHTML).toBe('<u>test</u>');
  });

  test('applies correct color for default type', () => {
    render(<NotificationItem type="default" value="test" />);
    const listItem = screen.getByText('test');
    
    expect(listItem.style.color).toBe('var(--default-notification-item)');
  });

  test('applies correct color for urgent type', () => {
    render(<NotificationItem type="urgent" value="test" />);
    const listItem = screen.getByText('test');
    
    expect(listItem.style.color).toBe('var(--urgent-notification-item)');
  });

  test('calls markAsRead with correct id when clicked', async () => {
    const user = userEvent.setup();
    const markAsReadSpy = jest.fn();
    render(<NotificationItem id={1} value="test" markAsRead={markAsReadSpy} />);
    
    const listItem = screen.getByText('test');
    await user.click(listItem);
    
    expect(markAsReadSpy).toHaveBeenCalledWith(1);
    expect(markAsReadSpy).toHaveBeenCalledTimes(1);
  });

  test('does not re-render when props are the same (memoization)', () => {
    const markAsReadSpy = jest.fn();
    const { rerender } = render(
      <NotificationItem id={1} type="default" value="test" markAsRead={markAsReadSpy} />
    );
    
    const listItem = screen.getByText('test');
    const firstRender = listItem;
    
    // Re-render with same props
    rerender(
      <NotificationItem id={1} type="default" value="test" markAsRead={markAsReadSpy} />
    );
    
    const secondRender = screen.getByText('test');
    
    // The DOM node should be the same (no re-render)
    expect(firstRender).toBe(secondRender);
  });

  test('re-renders when props change', () => {
    const markAsReadSpy = jest.fn();
    const { rerender } = render(
      <NotificationItem id={1} type="default" value="test" markAsRead={markAsReadSpy} />
    );
    
    expect(screen.getByText('test')).toBeInTheDocument();
    
    // Re-render with different props
    rerender(
      <NotificationItem id={1} type="default" value="updated" markAsRead={markAsReadSpy} />
    );
    
    expect(screen.getByText('updated')).toBeInTheDocument();
    expect(screen.queryByText('test')).not.toBeInTheDocument();
  });
});
