function Login() {
  const borderStyle = {
    borderTopColor: 'var(--main-color)',
  };

  return (
    <div className="App-body border-t-[3px] p-5 sm:p-10 min-h-[300px]" style={borderStyle}>
      <p className="text-base sm:text-lg mb-5">Login to access the full dashboard</p>
      <form className="flex flex-col gap-4 sm:flex-row sm:gap-5 sm:items-center">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-2">
          <label htmlFor="email" className="font-medium">Email:</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            className="border border-gray-300 px-3 py-2 rounded w-full sm:w-auto" 
          />
        </div>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-2">
          <label htmlFor="password" className="font-medium">Password:</label>
          <input 
            type="password" 
            id="password" 
            name="password" 
            className="border border-gray-300 px-3 py-2 rounded w-full sm:w-auto" 
          />
        </div>
        <button 
          type="submit" 
          className="bg-white border border-gray-400 px-6 py-2 rounded cursor-pointer hover:bg-gray-100 transition-colors"
        >
          OK
        </button>
      </form>
    </div>
  );
}

export default Login;
