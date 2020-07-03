import React from 'react'
import loader from '../../Images/pizzaLoading.gif'
import './index.css';
export default function LoadingPizza  () {  
    return(
    <div className="loading">
      <img src={loader} alt="logo"  className="loadingGif"/>
    </div>
      )
  }