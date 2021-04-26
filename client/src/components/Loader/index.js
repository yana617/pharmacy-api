import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

import useApp from '../../hooks/useApp';
import './styles.scss';

const Loader = () => {
  const app = useApp();

  return app.loading
    ? (<div className="loader__background"><CircularProgress /></div>)
    : null;
};

export default Loader;
