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
import sweetOne from '../../Images/sweetOne.jpg'
import sweetTwo from '../../Images/sweetTwo.jpg'
import sweetThree from '../../Images/sweetThree.jfif'
import sweetFour from '../../Images/sweetFour.jpg'
import drinkOne from '../../Images/drinkOne.jpg'
import drinkTwo from '../../Images/drinkTwo.jfif'
import drinkThree from '../../Images/drinkThree.jpg'
import drinkFour from '../../Images/drinkFour.jpg'

class Principal extends Component {
  constructor() {
  
    super()

    this.state = {
      item:{
        data:undefined,
        loaded: false
      },
      menu: 0,
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
    this.setState({
      item:{
        data:[{
            name:['Margherita Pizza','New York-Style Pizza','Chicago Pizza','Greek Pizza'],
            image:[pizzaOne,pizzaTwo,pizzaThree,pizzaFour],
            description:['Lorem ipsum mauris neque commodo tempus curabitur bibendum aliquam pellentesque hac ac, ut nibh potenti lorem mattis aenean enim convallis hac quam.',
                         'Lorem ipsum mauris neque commodo tempus curabitur bibendum aliquam pellentesque hac ac, ut nibh potenti lorem mattis aenean enim convallis hac quam.',
                         'Lorem ipsum mauris neque commodo tempus curabitur bibendum aliquam pellentesque hac ac, ut nibh potenti lorem mattis aenean enim convallis hac quam.',
                         'Lorem ipsum mauris neque commodo tempus curabitur bibendum aliquam pellentesque hac ac, ut nibh potenti lorem mattis aenean enim convallis hac quam.'
                        ],
          }, {
          name:['Chocolate Pizza','Petit Gateau','Ice Cream Cake','Brazilian Brigadeiro'],
          image:[sweetOne,sweetTwo,sweetThree,sweetFour],
          description:['Lorem ipsum mauris neque commodo tempus curabitur bibendum aliquam pellentesque hac ac, ut nibh potenti lorem mattis aenean enim convallis hac quam.',
                        'Lorem ipsum mauris neque commodo tempus curabitur bibendum aliquam pellentesque hac ac, ut nibh potenti lorem mattis aenean enim convallis hac quam.',
                        'Lorem ipsum mauris neque commodo tempus curabitur bibendum aliquam pellentesque hac ac, ut nibh potenti lorem mattis aenean enim convallis hac quam.',
                        'Lorem ipsum mauris neque commodo tempus curabitur bibendum aliquam pellentesque hac ac, ut nibh potenti lorem mattis aenean enim convallis hac quam.'
                      ],
        },{
          name:['Coca-Cola','Water','Wine','Brazilian Caipirinha'],
          image:[drinkOne,drinkTwo,drinkThree,drinkFour],
          description:['Lorem ipsum mauris neque commodo tempus curabitur bibendum aliquam pellentesque hac ac, ut nibh potenti lorem mattis aenean enim convallis hac quam.',
                        'Lorem ipsum mauris neque commodo tempus curabitur bibendum aliquam pellentesque hac ac, ut nibh potenti lorem mattis aenean enim convallis hac quam.',
                        'Lorem ipsum mauris neque commodo tempus curabitur bibendum aliquam pellentesque hac ac, ut nibh potenti lorem mattis aenean enim convallis hac quam.',
                        'Lorem ipsum mauris neque commodo tempus curabitur bibendum aliquam pellentesque hac ac, ut nibh potenti lorem mattis aenean enim convallis hac quam.'
                      ],
        }],
        loaded:true,
        }
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
    render(){
      if(this.state.item.loaded){
        let data = this.state.item.data[this.state.menu]
        return (
          <div className="itensMenu">
                <BottomNavigation
                value={this.state.menu}
                onChange={(event, newMenu) => {
                  this.changeMenu(newMenu);
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
                <Card className="menuItemLeft">
                  <img src={data.image[this.state.positionOne]} alt="Logo" className="itemImageLeft"/>
                  <h2 className="itemNameLeft">{data.name[this.state.positionOne]}</h2>
                  <p className="itemDescriptionLeft">
                      {data.description[this.state.positionOne]}
                  </p>
                  <Fab variant="extended" color="secondary" aria-label="add" className={"cartButtonLeft"}>
                    <ShoppingCartIcon/>
                    Add Cart
                  </Fab>
                </Card>
                <Card className="menuItemRight">
                  <img src={data.image[this.state.positionTwo]} alt="Logo" className="itemImageRight"/>
                  <h2 className="itemNameRight">{data.name[this.state.positionTwo]}</h2>
                  <p className="itemDescriptionRight">
                    {data.description[this.state.positionTwo]}
                  </p>
                  <Fab variant="extended" color="secondary" aria-label="add" className={"cartButtonRight"}>
                    <ShoppingCartIcon/>
                    Add Cart
                  </Fab>
                </Card>
                {
                  this.state.positionTwo === (data.name.length -1) ? '':
                    <Button className="Next" onClick={() => {this.changeItem(1)}} ><ArrowForwardIosOutlinedIcon /></Button>
                }
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