import { useState } from 'react';
import PropTypes from 'prop-types';

function Login({ logIn }) {
  const [enableSubmit, setEnableSubmit] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChangeEmail = (event) => {
    const email = event.target.value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      email,
    }));
    validateForm(email, formData.password);
  };

  const handleChangePassword = (event) => {
    const password = event.target.value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      password,
    }));
    validateForm(formData.email, password);
  };

  const validateForm = (email, password) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmailValid = emailRegex.test(email);
    const isPasswordValid = password.length >= 8;
    const isFormValid = isEmailValid && isPasswordValid && email !== '' && password !== '';
    
    setEnableSubmit(isFormValid);
  };

  const handleLoginSubmit = (event) => {
    event.preventDefault();
    logIn(formData.email, formData.password);
  };

  const borderStyle = {
    borderTopColor: 'var(--main-color)',
  };

  return (
    <div className="App-body" style={borderStyle}>
      <p>Login to access the full dashboard</p>
      <form onSubmit={handleLoginSubmit} data-testid="login-form">
        <div>
          <label htmlFor="email">Email:</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            value={formData.email}
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
            value={formData.password}
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
