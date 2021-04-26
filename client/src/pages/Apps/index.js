import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';

import Header from '../../components/Header';
import App from '../../components/App';
import useApp from '../../hooks/useApp';
import { makeRequest } from '../../utils/makeRequest';
import './styles.scss';

const Apps = () => {
  const app = useApp();
  const [apps, setApps] = useState();

  useEffect(() => {
    if (apps) return;

    const fetchApps = async () => {
      app.setLoading(true);
      const result = await makeRequest('/apps');
      app.setLoading(false);
      if (!result.success) {
        app.setSnackbarText(result.error);
        app.setSnackbar(true);
      } else {
        setApps(result.apps);
      }
    };

    fetchApps();
  }, [app, apps]);

  return (
    <div className="apps-page">
      <Header />
      {apps && apps.map(app => <App key={app._id} {...app} />)}
      {(!apps || !apps.length) && <p className="apps-page__no-apps-text">NO APPS YET</p>}
      <Button
        variant="contained"
        className="apps-page__add-btn"
        color="primary"
      >
        Add new app
      </Button>
    </div>
  );
};

export default Apps;