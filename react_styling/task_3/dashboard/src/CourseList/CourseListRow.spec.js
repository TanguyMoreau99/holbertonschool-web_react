import { render } from '@testing-library/react';
import CourseListRow from './CourseListRow';

describe('CourseListRow component', () => {
  test('renders without crashing', () => {
    render(
      <table>
        <tbody>
          <CourseListRow textFirstCell="test" />
        </tbody>
      </table>
    );
  });

  test('when isHeader is true and textSecondCell is null, renders one th with colspan=2', () => {
    const { container } = render(
      <table>
        <thead>
          <CourseListRow isHeader={true} textFirstCell="test" />
        </thead>
      </table>
    );
    const th = container.querySelector('th');
    expect(th).toBeInTheDocument();
    expect(th).toHaveAttribute('colspan', '2');
    expect(th.textContent).toBe('test');
  });

  test('when isHeader is true and textSecondCell is not null, renders two th elements', () => {
    const { container } = render(
      <table>
        <thead>
          <CourseListRow isHeader={true} textFirstCell="test1" textSecondCell="test2" />
        </thead>
      </table>
    );
    const thElements = container.querySelectorAll('th');
    expect(thElements).toHaveLength(2);
    expect(thElements[0].textContent).toBe('test1');
    expect(thElements[1].textContent).toBe('test2');
  });

  test('when isHeader is false, renders two td elements within a tr', () => {
    const { container } = render(
      <table>
        <tbody>
          <CourseListRow isHeader={false} textFirstCell="test1" textSecondCell="test2" />
        </tbody>
      </table>
    );
    const tr = container.querySelector('tr');
    const tdElements = container.querySelectorAll('td');
    expect(tr).toBeInTheDocument();
    expect(tdElements).toHaveLength(2);
    expect(tdElements[0].textContent).toBe('test1');
    expect(tdElements[1].textContent).toBe('test2');
  });
});
