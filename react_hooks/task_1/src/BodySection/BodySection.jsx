import { Component } from 'react';
import PropTypes from 'prop-types';

class BodySection extends Component {
  render() {
    const { title, children } = this.props;

    return (
      <div className="bodySection p-5">
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        {children}
      </div>
    );
  }
}

BodySection.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
};

export default BodySection;
