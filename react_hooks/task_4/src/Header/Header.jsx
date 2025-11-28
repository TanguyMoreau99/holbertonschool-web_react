import { Component } from 'react';
import logo from '../assets/holberton-logo.jpg';
import AppContext from '../Context/context';

class Header extends Component {
  render() {
    const { user, logOut } = this.context;
    
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
}

Header.contextType = AppContext;

export default Header;
