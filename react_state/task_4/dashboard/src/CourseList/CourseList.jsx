import { Component } from 'react';
import PropTypes from 'prop-types';
import CourseListRow from './CourseListRow';

class CourseList extends Component {
  render() {
    const { courses } = this.props;

    return (
      <div className="w-[85%] mx-auto my-10 max-[912px]:w-full max-[912px]:my-5">
        <table id="CourseList" className="w-full border-collapse">
          <thead>
            <CourseListRow textFirstCell="Available courses" isHeader={true} />
            <CourseListRow textFirstCell="Course name" textSecondCell="Credit" isHeader={true} />
          </thead>
          <tbody>
            {courses.length === 0 ? (
              <CourseListRow textFirstCell="No course available yet" isHeader={false} />
            ) : (
              courses.map((course) => (
                <CourseListRow
                  key={course.id}
                  textFirstCell={course.name}
                  textSecondCell={course.credit}
                  isHeader={false}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    );
  }
}

CourseList.propTypes = {
  courses: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      credit: PropTypes.number.isRequired,
    })
  ),
};

CourseList.defaultProps = {
  courses: [],
};

export default CourseList;
