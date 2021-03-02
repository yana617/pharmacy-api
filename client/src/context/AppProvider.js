import React, { createContext, useState } from 'react';

export const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState(false);
  const [snackbarText, setSnackbarText] = useState('');

  return (
    <AppContext.Provider value={{
      loading,
      setLoading,
      snackbar,
      setSnackbar,
      snackbarText,
      setSnackbarText,
    }}>
      {children}
    </AppContext.Provider>);
};

export default AppProvider;
