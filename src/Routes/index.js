import React from "react";
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Principal from '../Pages/Principal'
import Cart from '../Pages/Cart'

export default (
  <Router>
    <Route path="/" component={Principal} />
    <Route path="/cart" component={Cart} />
  </Router>
)