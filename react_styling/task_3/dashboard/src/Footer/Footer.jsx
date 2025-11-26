function Footer() {
  const borderStyle = {
    borderTopColor: 'var(--main-color)',
  };

  return (
    <footer className="App-footer border-t-[3px] p-5 text-center italic fixed bottom-0 left-0 right-0 bg-white" style={borderStyle}>
      <p>Copyright {new Date().getFullYear()} - Holberton School</p>
    </footer>
  );
}

export default Footer;
