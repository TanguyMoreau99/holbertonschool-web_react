import logo from '../assets/holberton-logo.jpg';

function Header() {
  const headingStyle = {
    color: 'var(--main-color)',
  };

  return (
    <header className="App-header flex flex-col sm:flex-row items-center border-b-[3px] p-5 gap-4 sm:gap-0" style={{ borderBottomColor: 'var(--main-color)' }}>
      <img src={logo} className="w-32 h-32 sm:w-52 sm:h-52" alt="Holberton logo" />
      <h1 className="text-2xl sm:text-4xl sm:ml-5 text-center sm:text-left max-[520px]:text-xl" style={headingStyle}>School dashboard</h1>
    </header>
  );
}

export default Header;
