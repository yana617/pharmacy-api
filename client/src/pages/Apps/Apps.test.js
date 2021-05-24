import Apps from './index';
import * as request from '../../utils/makeRequest';
import { render, screen, waitFor, act } from '../../custom-render';

const req = jest.spyOn(request, 'makeRequest');
req.mockResolvedValue(Promise.resolve({ success: true, apps: [] }));

test('renders no apps text', async () => {
  const req = jest.spyOn(request, 'makeRequest');
  req.mockResolvedValue(Promise.resolve({ success: true, apps: [] }));
  await act(async () => {
    render(<Apps />);
    expect(screen.getByText(/NO APPS YET/i)).toBeInTheDocument();
  });
});

test('renders header', async () => {
  const req = jest.spyOn(request, 'makeRequest');
  req.mockResolvedValue(Promise.resolve({ success: true, apps: [] }));
  await act(async () => {
    render(<Apps />);
    expect(screen.getByText(/PHARMACY/i)).toBeInTheDocument();
  });
});

test('renders apps', async () => {
  const req = jest.spyOn(request, 'makeRequest');
  req.mockResolvedValue(Promise.resolve({
    success: true, apps: [{ _id: '1', name: 'appName', medicinesCount: 5 }],
  }));
  await act(async () => {
    render(<Apps />);
    await waitFor(() => expect(screen.getByText('appName')).toBeInTheDocument());
  });
});
