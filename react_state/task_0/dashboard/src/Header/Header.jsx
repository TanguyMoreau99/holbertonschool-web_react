import logo from '../assets/holberton-logo.jpg';

function Header() {
  const headingStyle = {
    color: 'var(--main-color)',
  };
  
  const borderStyle = {
    borderBottomColor: 'var(--main-color)',
  };

  return (
    <header className="App-header flex flex-col items-center border-b-[3px] p-5
                       sm:flex-row sm:items-center" 
            style={borderStyle}>
      <img src={logo} className="w-40 h-40 sm:w-48 sm:h-48" alt="Holberton logo" />
      <h1 className="text-3xl mt-4 sm:mt-0 sm:ml-5 sm:text-4xl" style={headingStyle}>
        School dashboard
      </h1>
    </header>
  );
}

export default Header;
