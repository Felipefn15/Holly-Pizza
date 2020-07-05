import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import Routes from './Routes'
import * as serviceWorker from './serviceWorker';
import Structure from './Components/Header'
import Footer from './Components/Footer'
ReactDOM.render(
  <React.StrictMode>
    <Structure/>
      <Router>
        {Routes}
      </Router>
    <Footer/>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
