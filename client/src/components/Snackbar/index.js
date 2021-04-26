import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';

import useApp from '../../hooks/useApp';

const MySnackbar = () => {
  const app = useApp();

  return (
    <Snackbar
      open={app.snackbar}
      autoHideDuration={6000}
      onClose={() => app.setSnackbar(false)}
      message={app.snackbarText}
    />
  );
};

export default MySnackbar;
