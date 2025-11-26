import { PureComponent } from 'react';
import PropTypes from 'prop-types';

class NotificationItem extends PureComponent {
  render() {
    const { type, html, value, markAsRead, id } = this.props;
    
    const textColorStyle = {
      color: type === 'urgent' ? 'var(--urgent-notification-item)' : 'var(--default-notification-item)',
    };
    
    const className = "text-base max-[912px]:text-xl max-[912px]:py-2.5 max-[912px]:px-0 max-[912px]:border-b max-[912px]:border-black";
    
    if (html) {
      return (
        <li
          data-notification-type={type}
          dangerouslySetInnerHTML={html}
          style={textColorStyle}
          className={className}
          onClick={() => markAsRead(id)}
        />
      );
    }
    
    return (
      <li 
        data-notification-type={type} 
        style={textColorStyle}
        className={className}
        onClick={() => markAsRead(id)}
      >
        {value}
      </li>
    );
  }
}

NotificationItem.propTypes = {
  type: PropTypes.string,
  html: PropTypes.shape({
    __html: PropTypes.string,
  }),
  value: PropTypes.string,
  markAsRead: PropTypes.func,
  id: PropTypes.number,
};

NotificationItem.defaultProps = {
  type: 'default',
  html: null,
  value: '',
  markAsRead: () => {},
  id: 0,
};

export default NotificationItem;
