import { memo } from 'react';
import PropTypes from 'prop-types';
import NotificationItem from './NotificationItem';

function Notifications({ displayDrawer, notifications, handleDisplayDrawer, handleHideDrawer, markNotificationAsRead }) {
  const borderStyle = {
    borderColor: 'var(--main-color)',
  };

  // Apply bounce animation when there are notifications and drawer is closed
  const shouldBounce = notifications.length > 0 && !displayDrawer;

  if (!displayDrawer) {
    return (
      <div className="Notifications-container">
        <div className="menuItem" onClick={handleDisplayDrawer}>
          <p className={shouldBounce ? 'animate-bounce' : ''}>Your notifications</p>
        </div>
      </div>
    );
  }

  return (
    <div className="Notifications-container">
      <div className="menuItem hidden md:block">
        <p>Your notifications</p>
      </div>
      <div 
        className="Notifications"
        style={borderStyle}
      >
        <button
          aria-label="Close"
          onClick={handleHideDrawer}
        >
          ×
        </button>
        {notifications.length === 0 ? (
          <p>No new notification for now</p>
        ) : (
          <>
            <p>Here is the list of notifications</p>
            <ul>
              {notifications.map((notification) => (
                <NotificationItem
                  key={notification.id}
                  id={notification.id}
                  type={notification.type}
                  value={notification.value}
                  html={notification.html}
                  markAsRead={markNotificationAsRead}
                />
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
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
  handleDisplayDrawer: PropTypes.func,
  handleHideDrawer: PropTypes.func,
  markNotificationAsRead: PropTypes.func,
};

Notifications.defaultProps = {
  displayDrawer: false,
  notifications: [],
  handleDisplayDrawer: () => {},
  handleHideDrawer: () => {},
  markNotificationAsRead: () => {},
};

// Custom comparison function for memo
const areEqual = (prevProps, nextProps) => {
  // Only re-render if notifications length changes or displayDrawer changes
  return (
    prevProps.displayDrawer === nextProps.displayDrawer &&
    prevProps.notifications.length === nextProps.notifications.length
  );
};

export default memo(Notifications, areEqual);
