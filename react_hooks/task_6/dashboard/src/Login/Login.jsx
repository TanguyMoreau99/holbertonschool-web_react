import PropTypes from 'prop-types';
import useLogin from '../hooks/useLogin';

function Login({ logIn }) {
  const {
    email,
    password,
    enableSubmit,
    handleChangeEmail,
    handleChangePassword,
    handleSubmit,
  } = useLogin(logIn);

  const borderStyle = {
    borderTopColor: 'var(--main-color)',
  };

  return (
    <div className="App-body" style={borderStyle}>
      <p>Login to access the full dashboard</p>
      <form onSubmit={handleSubmit} data-testid="login-form">
        <div>
          <label htmlFor="email">Email:</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            value={email}
            onChange={handleChangeEmail}
            data-testid="email-input"
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input 
            type="password" 
            id="password" 
            name="password" 
            value={password}
            onChange={handleChangePassword}
            data-testid="password-input"
          />
        </div>
        <input 
          type="submit" 
          value="OK" 
          disabled={!enableSubmit}
          data-testid="submit-button"
        />
      </form>
    </div>
  );
}

Login.propTypes = {
  logIn: PropTypes.func,
};

Login.defaultProps = {
  logIn: () => {},
};

export default Login;
