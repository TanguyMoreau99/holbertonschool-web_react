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
      <>
        <div className="menuItem fixed top-2 right-2 p-2 cursor-pointer bg-white z-40 md:static md:text-right md:p-2.5">
          <p className="m-0 font-bold">Your notifications</p>
        </div>
        {displayDrawer && (
          <div 
            className="Notifications fixed top-0 left-0 w-full h-full bg-white z-50 p-3 overflow-y-auto
                       md:absolute md:top-0 md:right-0 md:w-96 md:h-auto md:left-auto md:border-2 md:border-dashed md:p-1.5"
            style={borderStyle}
          >
            <button
              className="absolute right-2.5 top-2.5 bg-transparent border-none cursor-pointer text-2xl font-bold"
              aria-label="Close"
              onClick={() => console.log('Close button has been clicked')}
            >
              ×
            </button>
            {notifications.length === 0 ? (
              <p className="m-0 mt-8">No new notification for now</p>
            ) : (
              <>
                <p className="m-0 mb-2.5 mt-8">Here is the list of notifications</p>
                <ul className="list-none p-0 m-0 mt-2.5">
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
      </>
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
