import PropTypes from 'prop-types';

function Footer({ user }) {
  const borderStyle = {
    borderTopColor: 'var(--main-color)',
  };

  return (
    <footer className="App-footer" style={borderStyle}>
      <p>Copyright {new Date().getFullYear()} - Holberton School</p>
      {user.isLoggedIn && (
        <p>
          <a href="#">Contact us</a>
        </p>
      )}
    </footer>
  );
}

Footer.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string,
    password: PropTypes.string,
    isLoggedIn: PropTypes.bool,
  }),
};

Footer.defaultProps = {
  user: {
    email: '',
    password: '',
    isLoggedIn: false,
  },
};

export default Footer;
