import { useContext } from 'react';
import AppContext from '../Context/context';

function Footer() {
  const { user } = useContext(AppContext);
  
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

export default Footer;
