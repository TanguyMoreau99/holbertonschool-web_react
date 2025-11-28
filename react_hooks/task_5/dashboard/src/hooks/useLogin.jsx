import { useState, useCallback } from 'react';

function useLogin(onLogin) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [enableSubmit, setEnableSubmit] = useState(false);

  const validateForm = useCallback((email, password) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmailValid = emailRegex.test(email);
    const isPasswordValid = password.length >= 8;
    const isFormValid = isEmailValid && isPasswordValid && email !== '' && password !== '';
    
    setEnableSubmit(isFormValid);
  }, []);

  const handleChangeEmail = useCallback((event) => {
    const email = event.target.value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      email,
    }));
    validateForm(email, formData.password);
  }, [formData.password, validateForm]);

  const handleChangePassword = useCallback((event) => {
    const password = event.target.value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      password,
    }));
    validateForm(formData.email, password);
  }, [formData.email, validateForm]);

  const handleSubmit = useCallback((event) => {
    event.preventDefault();
    if (onLogin) {
      onLogin(formData.email, formData.password);
    }
  }, [formData.email, formData.password, onLogin]);

  return {
    email: formData.email,
    password: formData.password,
    enableSubmit,
    handleChangeEmail,
    handleChangePassword,
    handleSubmit,
  };
}

export default useLogin;
