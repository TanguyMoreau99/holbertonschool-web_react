import { useContext } from 'react';
import logo from '../assets/holberton-logo.jpg';
import AppContext from '../Context/context';

function Header() {
  const { user, logOut } = useContext(AppContext);
  
  const headingStyle = {
    color: 'var(--main-color)',
  };
  
  const borderStyle = {
    borderBottomColor: 'var(--main-color)',
  };

  return (
    <>
      <header className="App-header" style={borderStyle}>
        <img src={logo} alt="Holberton logo" />
        <h1 style={headingStyle}>School dashboard</h1>
      </header>
      {user.isLoggedIn && (
        <div id="logoutSection" className="px-4 sm:px-6 md:px-8 py-4">
          <p>
            Welcome {user.email} (
            <a 
              href="#" 
              onClick={(e) => {
                e.preventDefault();
                logOut();
              }}
              style={{ cursor: 'pointer', textDecoration: 'underline' }}
            >
              logout
            </a>
            )
          </p>
        </div>
      )}
    </>
  );
}

export default Header;
