import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import AppProvider from './context/AppProvider';

const Wrapper = ({ children }) => {
  return (
    <AppProvider>
      <MemoryRouter>{children}</MemoryRouter>
    </AppProvider>
  );
};

const customRender = (ui, options) =>
  render(ui, { wrapper: Wrapper, ...options });

export * from '@testing-library/react';

export { customRender as render };