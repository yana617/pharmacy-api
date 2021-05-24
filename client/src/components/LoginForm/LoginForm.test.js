import { render, screen, fireEvent, act } from '@testing-library/react';

import LoginForm from './index';
import * as request from '../../utils/makeRequest';
import App from '../../App';

jest.mock('react-router-dom', () => {
  const actual = jest.requireActual('react-router-dom');
  return {
    ...actual,
    useHistory: () => [],
  };
});

test('renders title', () => {
  render(<LoginForm />);
  const titleElement = screen.getByText(/Login Form/i);
  expect(titleElement).toBeInTheDocument();
});

test('renders two inputs and button', () => {
  const { container } = render(<LoginForm />);
  expect(container.querySelector('#login-input')).toBeInTheDocument();
  expect(container.querySelector('#password-input')).toBeInTheDocument();
  expect(container.getElementsByClassName('login-form__btn').length).toBe(1);
});

test('send request on click', async () => {
  const req = jest.spyOn(request, 'makeRequest');
  req.mockResolvedValue(Promise.resolve({ success: true }));
  const { container } = render(<App />);
  const loginInput = container.querySelector('#login-input');
  fireEvent.change(loginInput, { target: { value: 'login' } });
  const passwordInput = container.querySelector('#password-input');
  fireEvent.change(passwordInput, { target: { value: 'password' } });
  await act(async () => {
    fireEvent.click(screen.getByText('Log in'));
  });
  expect(request.makeRequest).toHaveBeenCalled();
});
