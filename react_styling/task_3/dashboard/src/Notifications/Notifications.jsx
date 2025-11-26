import { Component } from 'react';
import PropTypes from 'prop-types';
import NotificationItem from './NotificationItem';

class Notifications extends Component {
  constructor(props) {
    super(props);
    this.markAsRead = this.markAsRead.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.notifications.length !== this.props.notifications.length;
  }

  markAsRead(id) {
    console.log(`Notification ${id} has been marked as read`);
  }

  render() {
    const { displayDrawer, notifications } = this.props;

    const borderStyle = {
      borderColor: 'var(--main-color)',
    };

    return (
      <div className="Notifications-container absolute top-0 right-0">
        <div className="menuItem text-right p-2.5 cursor-pointer">
          <p className="m-0 font-bold">Your notifications</p>
        </div>
        {displayDrawer && (
          <div 
            className="Notifications border-2 border-dashed p-1.5 relative w-96 bg-white"
            style={borderStyle}
          >
            <button
              className="absolute right-2.5 top-2.5 bg-transparent border-none cursor-pointer text-xl"
              aria-label="Close"
              onClick={() => console.log('Close button has been clicked')}
            >
              ×
            </button>
            {notifications.length === 0 ? (
              <p className="m-0">No new notification for now</p>
            ) : (
              <>
                <p className="m-0 mb-2.5">Here is the list of notifications</p>
                <ul className="list-inside p-0 m-0 mt-2.5">
                  {notifications.map((notification) => (
                    <NotificationItem
                      key={notification.id}
                      id={notification.id}
                      type={notification.type}
                      value={notification.value}
                      html={notification.html}
                      markAsRead={this.markAsRead}
                    />
                  ))}
                </ul>
              </>
            )}
          </div>
        )}
      </div>
    );
  }
}

Notifications.propTypes = {
  displayDrawer: PropTypes.bool,
  notifications: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      type: PropTypes.string.isRequired,
      value: PropTypes.string,
      html: PropTypes.shape({
        __html: PropTypes.string,
      }),
    })
  ),
};

Notifications.defaultProps = {
  displayDrawer: false,
  notifications: [],
};

export default Notifications;
