import { Component } from 'react';
import PropTypes from 'prop-types';

class CourseListRow extends Component {
  render() {
    const { isHeader, textFirstCell, textSecondCell } = this.props;
    
    const headerBgColor = 'bg-[var(--color-table-header)]';
    const rowBgColor = 'bg-[var(--color-table-rows)]';
    const headerOpacity = 'opacity-66';
    const rowOpacity = 'opacity-45';
    const borderClass = 'border border-gray-400';
    
    if (isHeader) {
      if (textSecondCell === null) {
        return (
          <tr className={`${headerBgColor} ${headerOpacity}`}>
            <th colSpan="2" className={borderClass}>{textFirstCell}</th>
          </tr>
        );
      } else {
        return (
          <tr className={`${headerBgColor} ${headerOpacity}`}>
            <th className={borderClass}>{textFirstCell}</th>
            <th className={borderClass}>{textSecondCell}</th>
          </tr>
        );
      }
    } else {
      return (
        <tr className={`${rowBgColor} ${rowOpacity}`}>
          <td className={`${borderClass} pl-2`}>{textFirstCell}</td>
          <td className={`${borderClass} pl-2`}>{textSecondCell}</td>
        </tr>
      );
    }
  }
}

CourseListRow.propTypes = {
  isHeader: PropTypes.bool,
  textFirstCell: PropTypes.string,
  textSecondCell: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

CourseListRow.defaultProps = {
  isHeader: false,
  textFirstCell: '',
  textSecondCell: null,
};

export default CourseListRow;
