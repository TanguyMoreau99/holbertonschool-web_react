function Login() {
  const borderStyle = {
    borderTopColor: 'var(--main-color)',
  };

  return (
    <div className="App-body border-t-[3px] p-10 min-h-[300px] max-[912px]:p-5" style={borderStyle}>
      <p className="text-lg">Login to access the full dashboard</p>
      <form className="mt-5 flex flex-col sm:flex-row gap-5 items-start sm:items-center">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full sm:w-auto">
          <label htmlFor="email" className="font-medium">Email:</label>
          <input type="email" id="email" name="email" className="border border-gray-300 px-2 py-1 rounded w-full sm:w-auto" />
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full sm:w-auto">
          <label htmlFor="password" className="font-medium">Password:</label>
          <input type="password" id="password" name="password" className="border border-gray-300 px-2 py-1 rounded w-full sm:w-auto" />
        </div>
        <button type="submit" className="bg-white border border-gray-400 px-4 py-1 rounded cursor-pointer hover:bg-gray-100 w-full sm:w-auto">
          OK
        </button>
      </form>
    </div>
  );
}

export default Login;
