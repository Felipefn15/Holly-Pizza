import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import Routes from './Routes'
import * as serviceWorker from './serviceWorker';
import Structure from './Components/Structure'
ReactDOM.render(
  <React.StrictMode>
    <Structure
      page = {Routes}
    />
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
