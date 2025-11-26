import logo from '../assets/holberton-logo.jpg';

function Header() {
  const headingStyle = {
    color: 'var(--main-color)',
  };

  return (
    <header className="App-header flex items-center border-b-[3px] p-5" style={{ borderBottomColor: 'var(--main-color)' }}>
      <img src={logo} className="w-52 h-52" alt="Holberton logo" />
      <h1 className="ml-5" style={headingStyle}>School dashboard</h1>
    </header>
  );
}

export default Header;
