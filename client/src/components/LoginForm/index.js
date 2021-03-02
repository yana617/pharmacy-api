import React, { useCallback } from 'react';
import Button from '@material-ui/core/Button';

import { makeRequest } from '../../utils/makeRequest';
import useInput from '../../hooks/useInput';
import useApp from '../../hooks/useApp';

import './styles.scss';

const LoginFrom = () => {
  const [login, loginInput] = useInput({ label: 'Login', className: 'login-form__input', id: 'login-input' });
  const [password, passwordInput] = useInput({
    label: 'Password',
    className: 'login-form__input',
    type: 'password',
    id: 'password-input',
  });
  const app = useApp();

  const sendRequest = useCallback(async () => {
    if (app.loading) return;
    app.setLoading(true);
    const result = await makeRequest('/admins/login', {
      method: 'POST',
      body: JSON.stringify({ login, password }),
    });
    app.setLoading(false);
    if (!result.success) {
      app.setSnackbarText(result.error);
      app.setSnackbar(true);
    }
  }, [login, password, app]);

  return (
    <div className="login-form">
      <h2>Login Form</h2>
      {loginInput}
      {passwordInput}
      <Button
        onClick={sendRequest}
        variant="contained"
        className="login-form__btn"
        color="primary"
      >
        Log in
      </Button>
    </div>
  );
};

export default LoginFrom;