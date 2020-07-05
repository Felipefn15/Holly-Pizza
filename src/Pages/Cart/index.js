import React, { Component }  from 'react';
import './index.css';
import Fab from '@material-ui/core/Fab';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { Button } from '@material-ui/core';
import LoadingPizza from '../../Components/Pizza'
import PizzaOrders from '../../Core/PizzaOrders'
class Cart extends Component {
    constructor() {
        super()
  
        this.state = {
          item:{
            data:undefined,
            loaded: false
          },
          freight:undefined,
          total : 0
        }
  
        this.refreshReportData = this.refreshReportData.bind(this)
      }
  
      componentDidMount() {
        this.refreshReportData()
      }
  
      refreshReportData(){
        let user = window.localStorage.getItem('loginPizza')
        PizzaOrders.getItemsCart('orders',user).then((response) => {
          if(response.data !== null){
          this.setState({
            item:{
              data:response.data.data,
              loaded : true
            }
          })
          response.data.data.forEach((data)=>{
            this.setState({
              total: this.state.total + data[4]
            })
          })
          }
        })
      }

      buildList(){
        if(this.state.item.loaded){
            let content = []
            let i = 1
            this.state.item.data.forEach((data)=>{ 
                content.push(
                    <TableRow key={data[1]}>
                        <TableCell align="left">{data[1]}</TableCell>
                        <TableCell align="left"><TextField
                            autoFocus
                            margin="dense"
                            id={"quantity"+i}
                            type="number"
                            className='quantityItens'
                            defaultValue = {data[2]}
                            inputProps={{ min: "0", max: "1000", step: "1" }}
                          /></TableCell>
                        <TableCell align="left">€{(data[4])}/U${(data[4]*1.12).toFixed(2)}</TableCell>
                    </TableRow>
                )
                i += 1
            })
            
            return(
                content
            )
        }
      }

      freightCalculator(){
        if(this.state.item.data.length > 0){
          if(document.getElementById('zipCode') !== undefined){
            let value = Math.floor(Math.random() * 100)
            this.setState({
              freight: value ,
              total: this.state.total + value
            })
          }
        }
        else{
          alert('No Products selected')
        }
      }

      checkOut(){
        if(this.state.item.data.length > 0){
          if(this.state.freight !== undefined){
            let i = 1
            let user = window.localStorage.getItem('loginPizza')
            this.state.item.data.forEach((item)=>{
              let quantity = document.getElementById('quantity'+i).value
              PizzaOrders.postItemsCart('insert',item[0],item[1],quantity,(item[4]*quantity).toFixed(2)).then((response)=>{
                if(i >= this.state.item.data.length){
                    PizzaOrders.postItemsCart('clear',user).then((clear)=>{
                      window.localStorage.clear('quantity')
                      alert('Thank You!')
                      window.location.reload();
                  })
                }
              })
              i += 1
            })
          }
          else
            alert('Plese enter yout zip code')
        }
        else{
          alert('No Products selected')
        }
    }

      render(){
        if(this.state.item.loaded){
          return (
            <div className="content">
                <div className="itensOrder">
                    <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                <TableCell align="left">Item</TableCell>
                                <TableCell align="left">Quantity</TableCell>
                                <TableCell align="left">Price</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.buildList()}
                            </TableBody>
                        </Table>
                        <div className='zipCheckOut'>
                          <p className="zip">
                            Zip code:
                          </p>
                          <TextField
                            autoFocus
                            margin="dense"
                            id="zipCode"
                            type="number"
                            className='zipField'
                            fullWidth
                          />
                          <Fab variant="extended" className='btnCalculate' color="warning" aria-label="add"  onClick={() =>this.freightCalculator()}> 
                            Calculate
                          </Fab>
                          <p className="freight">
                            Freight price:€{this.state.freight}
                          </p>
                          <p className="total">
                            Total Price:€{this.state.total}/U${(this.state.total*1.12).toFixed(2)}
                          </p>
                          
                          <Fab variant="extended" className='btnCheckout' color="secondary" aria-label="add"  onClick={() => this.checkOut()}> 
                            <ShoppingCartIcon/>
                            Checkout
                          </Fab>
                        </div>
                    </TableContainer>
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
export default Cart