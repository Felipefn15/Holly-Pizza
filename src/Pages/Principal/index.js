import React, { Component }  from 'react';
import './index.css';
import Fab from '@material-ui/core/Fab';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import LocalPizzaOutlinedIcon from '@material-ui/icons/LocalPizzaOutlined';
import CakeOutlinedIcon from '@material-ui/icons/CakeOutlined';
import LocalBarOutlinedIcon from '@material-ui/icons/LocalBarOutlined';
import ArrowBackIosOutlinedIcon from '@material-ui/icons/ArrowBackIosOutlined';
import ArrowForwardIosOutlinedIcon from '@material-ui/icons/ArrowForwardIosOutlined';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Card from '@material-ui/core/Card';
import { Button } from '@material-ui/core';
import LoadingPizza from '../../Components/Pizza'
import pizzaOne from '../../Images/pizza1.jpg'
import pizzaTwo from '../../Images/pizza2.jpg'
import pizzaThree from '../../Images/pizza3.jpg'
import pizzaFour from '../../Images/pizza4.jpg'
import pizzaFive from '../../Images/pizza5.jfif'
import pizzaSix from '../../Images/pizza6.jfif'
import pizzaSeven from '../../Images/pizza7.jfif'
import pizzaEight from '../../Images/pizza8.jfif'
import sweetOne from '../../Images/sweetOne.jpg'
import sweetTwo from '../../Images/sweetTwo.jfif'
import sweetThree from '../../Images/sweetThree.jpg'
import sweetFour from '../../Images/sweetFour.jpg'
import drinkOne from '../../Images/drinkOne.jpg'
import drinkTwo from '../../Images/drinkTwo.jpg'
import drinkThree from '../../Images/drinkThree.jfif'
import drinkFour from '../../Images/drinkFour.jpg'
import PizzaOrders from '../../Core/PizzaOrders'
class Principal extends Component {
    constructor() {
    
      super()

      this.state = {
        item:{
          data:undefined,
          loaded: false
        },
        menu: 1,
        positionOne:0,
        positionTwo:1
      }

      this.refreshReportData = this.refreshReportData.bind(this)
    }

    componentDidMount() {
      this.refreshReportData()
      this.defineItems(this.state.menu)
    }

    refreshReportData(){
      PizzaOrders.getAllProducts().then((response) => {
        this.setState({
          item:{
            data:response.data.data,
            loaded : true
          }
        })
      })
    }

    defineItems(position){
        this.setState({
          menu: position,
          positionOne: 0 ,
          positionTwo: 1
      })
    }

    changeMenu(value){
      this.setState({
        menu:value
      })
      this.defineItems(value)
    }

    changeItem(direction){
      if(direction === 1){
        let one = this.state.positionOne
        let two = this.state.positionTwo
        this.setState({
          positionOne: ++one ,
          positionTwo: ++two 
        })
      }
      else{
        let one = this.state.positionOne
        let two = this.state.positionTwo
        this.setState({
          positionOne: --one,
          positionTwo: --two
        })
      }
    }

    returnImage(indice){
      let image = undefined
      if(this.state.menu === 1){
        switch (indice) {
          case 0:
            image =  pizzaOne
            break;
          case 1:
            image =  pizzaTwo
            break;
          case 2:
            image =  pizzaThree
            break;
          case 3:
            image =  pizzaFour
            break;
          case 4:
            image =  pizzaFive
            break;
          case 5:
            image =  pizzaSix
            break;
          case 6:
            image =  pizzaSeven
            break;
          case 7:
            image =  pizzaEight
            break;
          default:
            break;
        }
      }
      else if(this.state.menu === 2){
        switch (indice) {
          case 0:
            image =  sweetOne
            break;
          case 1:
            image =  sweetTwo
            break;
          case 2:
            image =  sweetThree
            break;
          case 3:
            image =  sweetFour
            break;
          default:
            break;
        }
      }
      else {
        switch (indice) {
          case 0:
            image =  drinkOne
            break;
          case 1:
            image =  drinkTwo
            break;
          case 2:
            image =  drinkThree
            break;
          case 3:
            image =  drinkFour
            break;
          default:
              break;
        }
      }
      return image
    }

    addProduct(indice,menu){
      if(window.localStorage.getItem('loginPizza')){
        let product = this.state.item.data.filter(content => content[3] === this.state.menu)[indice][0]
        let user = window.localStorage.getItem('loginPizza')
        PizzaOrders.postItemsCart(null,user,product).then((response) =>{
          PizzaOrders.getItemsCart('orders',user).then((orders) => {
            let value = 0
            orders.data.data.forEach((item) =>{
              value += item[2]
              window.localStorage.setItem('quantity', `${value}`)
              window.location.reload();
            })
            
          })
        })
      }
      else{
        alert('Please Login to place the order')
      }
    }

    buildItemCard(indice,position){
      if(this.state.item.loaded){
        let data = this.state.item.data.filter(content => content[3] === this.state.menu)[indice]
        return(
        <Card className={"menuItem"+position}>
          <img src={this.returnImage(indice)} alt="Logo" className="itemImage"/>
          <h2 className={"itemName"}>{data[0]}</h2>
          <p className={"itemDescription"}>
              {data[1]}
          </p>
          <p className={"price"}>
            Price:€{data[2]}
          </p>
          <Fab variant="extended" color="secondary" aria-label="add" className={"cartButton"} onClick={() => {this.addProduct(indice,this.state.menu)}}> 
            <ShoppingCartIcon/>
            Add Cart
          </Fab>
        </Card>
        )
      }
    }

    render(){
      if(this.state.item.loaded){
        return (
          <div className="content">
            <div className="itensMenu">
                  <BottomNavigation
                  value={this.state.menu - 1}
                  onChange={(event, newMenu) => {
                    this.changeMenu(newMenu + 1);
                  }}
                  showLabels
                  className="options"
                >
                  <BottomNavigationAction label="Savory" icon={<LocalPizzaOutlinedIcon />} />
                  <BottomNavigationAction label="Sweet" icon={<CakeOutlinedIcon />} />
                  <BottomNavigationAction label="Drink" icon={<LocalBarOutlinedIcon />} />
                </BottomNavigation>
                <div className="menuContent">
                  {
                    this.state.positionOne === 0? '':
                    <Button className="Previous" onClick={() => {this.changeItem(0)}}><ArrowBackIosOutlinedIcon /></Button>
                  }
                  {this.buildItemCard(this.state.positionOne,'Left')}
                  {this.buildItemCard(this.state.positionTwo,'Right')}
                  {
                    this.state.positionTwo === (this.state.menu === 1?7:3) ? '':
                      <Button className="Next" onClick={() => {this.changeItem(1)}} ><ArrowForwardIosOutlinedIcon /></Button>
                  }
                </div>
            </div>
          </div>
        );
      }
      else
        return(
            <LoadingPizza/>
        )
    }
  }
  
export default Principal