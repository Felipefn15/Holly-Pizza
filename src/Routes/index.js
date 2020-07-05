import React from "react";
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Principal from '../Pages/Principal'
import Cart from '../Pages/Cart'
import History from '../Pages/History'

export default (
  <Router>
    <Route exact path="/" component={Principal} />
    <Route path="/cart" component={Cart} />
    <Route path="/history" component={History} />
  </Router>
)