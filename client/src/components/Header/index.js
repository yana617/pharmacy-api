import React from 'react';
import Button from '@material-ui/core/Button';

import './styles.scss';

const Header = () => {
  return (
    <header>
      <p>Pharmacy</p>
      <Button
        variant="outlined"
        color="primary"
      >
        Log out
      </Button>
    </header>
  );
};

export default Header;
