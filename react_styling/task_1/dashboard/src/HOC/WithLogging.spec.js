import { render, screen, cleanup } from '@testing-library/react';
import { Component } from 'react';
import WithLogging from './WithLogging';

class MockApp extends Component {
  render() {
    return (
      <h1>
        Hello from Mock App Component
      </h1>
    );
  }
}

describe('WithLogging HOC', () => {
  let consoleSpy;

  beforeEach(() => {
    consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleSpy.mockRestore();
    cleanup();
  });

  test('logs on mount and unmount with Component when wrapped element is pure html', () => {
    const WrappedComponent = WithLogging(() => <p>test</p>);
    const { unmount } = render(<WrappedComponent />);

    expect(consoleSpy).toHaveBeenCalledWith('Component Component is mounted');

    unmount();

    expect(consoleSpy).toHaveBeenCalledWith('Component Component is going to unmount');
  });

  test('logs on mount and unmount with the component name when wrapped element is the MockApp component', () => {
    const WrappedComponent = WithLogging(MockApp);
    const { unmount } = render(<WrappedComponent />);

    expect(consoleSpy).toHaveBeenCalledWith('Component MockApp is mounted');

    unmount();

    expect(consoleSpy).toHaveBeenCalledWith('Component MockApp is going to unmount');
  });

  test('renders the wrapped component correctly', () => {
    const WrappedComponent = WithLogging(MockApp);
    render(<WrappedComponent />);

    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading.textContent).toBe('Hello from Mock App Component');
  });

  test('has the correct displayName', () => {
    const WrappedComponent = WithLogging(MockApp);
    expect(WrappedComponent.displayName).toBe('WithLogging(MockApp)');
  });
});
