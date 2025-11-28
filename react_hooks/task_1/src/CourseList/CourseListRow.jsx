import { Component } from 'react';
import PropTypes from 'prop-types';

class CourseListRow extends Component {
  render() {
    const { isHeader, textFirstCell, textSecondCell } = this.props;
    
    const headerClasses = 'border border-gray-400';
    const cellClasses = 'border border-gray-400 pl-2';
    
    if (isHeader) {
      const headerRowStyle = {
        backgroundColor: 'var(--color-table-header)',
        opacity: '0.66',
      };
      
      if (textSecondCell === null) {
        return (
          <tr style={headerRowStyle}>
            <th colSpan="2" className={headerClasses}>{textFirstCell}</th>
          </tr>
        );
      } else {
        return (
          <tr style={headerRowStyle}>
            <th className={headerClasses}>{textFirstCell}</th>
            <th className={headerClasses}>{textSecondCell}</th>
          </tr>
        );
      }
    } else {
      const dataRowStyle = {
        backgroundColor: 'var(--color-table-rows)',
        opacity: '0.45',
      };
      
      return (
        <tr style={dataRowStyle}>
          <td className={cellClasses}>{textFirstCell}</td>
          <td className={cellClasses}>{textSecondCell}</td>
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
