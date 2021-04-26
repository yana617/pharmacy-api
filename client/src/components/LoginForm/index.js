import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';

import Input from '../Input';
import { makeRequest } from '../../utils/makeRequest';
import useApp from '../../hooks/useApp';

import './styles.scss';

const LoginFrom = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const app = useApp();
  const history = useHistory();

  const sendRequest = async () => {
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
    } else {
      history.push('/apps');
    }
  };

  return (
    <div className="login-form">
      <h2>Login Form</h2>
      <Input id="login-input" label="Login" className="login-form__input" value={login} onChange={setLogin} />
      <Input
        id="password-input"
        label="Password"
        className="login-form__input"
        type="password"
        value={password}
        onChange={setPassword}
      />
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