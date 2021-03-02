import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';
import * as request from './utils/makeRequest';

test('renders login form', () => {
  render(<App />);
  const titleElement = screen.getByText(/Login Form/i);
  expect(titleElement).toBeInTheDocument();
});

test('send request on click', async () => {
  const req = jest.spyOn(request, 'makeRequest');
  req.mockResolvedValue(Promise.resolve({ success: true }));
  const { container } = render(<App />);
  const loginInput = container.querySelector('#login-input');
  fireEvent.change(loginInput, { target: { value: 'login' } });
  const passwordInput = container.querySelector('#password-input');
  fireEvent.change(passwordInput, { target: { value: 'password' } });
  fireEvent.click(screen.getByText('Log in'));
  await waitFor(() => expect(request.makeRequest).toHaveBeenCalled());
});
