import React, { useEffect, useState } from 'react';

import './styles.scss';

const App = ({ name, medicinesCount }) => {
  const [image, setImage] = useState('');

  useEffect(() => {
    fetch('https://randomfox.ca/floof/')
      .then((res) => res.json())
      .then((res) => {
        setImage(res.image);
      });
  }, []);

  if (!image) return null;

  return (
    <div className="app">
      <div className="app__img" style={{ backgroundImage: `url(${image})` }}>
        <p className="app__img__text">View app</p>
      </div>
      <div>
        <p className="app__name">{name}</p>
        <p className="app__medicines">Medicines: {medicinesCount}</p>
      </div>
      <div className="app__arrow-view">
        <p>VIEW</p>
        <div className="app__arrow-container">
          <div className="app__arrow-container__line"></div>
          <div className="app__arrow-container__arrow"></div>
        </div>
      </div>
    </div>
  );
};

export default App;
