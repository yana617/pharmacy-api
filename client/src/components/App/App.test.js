import { render, screen, waitFor } from '@testing-library/react';

import App from './index';

test('renders name and medicinesCount', async () => {
  const app = { name: 'appName', medicinesCount: 5 };
  render(<App name={app.name} medicinesCount={app.medicinesCount} />);
  await waitFor(() => screen.getByText(app.name));
  await waitFor(() => screen.getByText(`Medicines: ${app.medicinesCount}`));
});
