import AppContext from '../Context/context';

function Footer() {
  const borderStyle = {
    borderTopColor: 'var(--main-color)',
  };

  return (
    <AppContext.Consumer>
      {({ user }) => (
        <footer className="App-footer" style={borderStyle}>
          <p>Copyright {new Date().getFullYear()} - Holberton School</p>
          {user.isLoggedIn && (
            <p>
              <a href="#">Contact us</a>
            </p>
          )}
        </footer>
      )}
    </AppContext.Consumer>
  );
}

export default Footer;
