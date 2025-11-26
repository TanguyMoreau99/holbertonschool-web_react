function Login() {
  const borderStyle = {
    borderTopColor: 'var(--main-color)',
  };

  return (
    <div className="App-body border-t-[3px] p-10 min-h-[300px]" style={borderStyle}>
      <p className="text-lg">Login to access the full dashboard</p>
      <form className="mt-5 flex gap-5 items-center">
        <div className="flex items-center gap-2">
          <label htmlFor="email" className="font-medium">Email:</label>
          <input type="email" id="email" name="email" className="border border-gray-300 px-2 py-1 rounded" />
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="password" className="font-medium">Password:</label>
          <input type="password" id="password" name="password" className="border border-gray-300 px-2 py-1 rounded" />
        </div>
        <button type="submit" className="bg-white border border-gray-400 px-4 py-1 rounded cursor-pointer hover:bg-gray-100">
          OK
        </button>
      </form>
    </div>
  );
}

export default Login;
