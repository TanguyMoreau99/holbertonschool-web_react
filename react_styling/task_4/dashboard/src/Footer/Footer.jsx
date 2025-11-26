function Footer() {
  const borderStyle = {
    borderTopColor: 'var(--main-color)',
  };

  return (
    <footer 
      className="App-footer absolute bottom-0 left-0 right-0 border-t-[3px] p-4 text-center italic text-sm sm:text-base bg-white" 
      style={borderStyle}
    >
      <p className="m-0">Copyright {new Date().getFullYear()} - Holberton School</p>
    </footer>
  );
}

export default Footer;
