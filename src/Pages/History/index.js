import React, { Component }  from 'react';
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
class History extends Component {
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
        PizzaOrders.getItemsCart('history',user).then((response) => {
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
            this.state.item.data.forEach((data)=>{ 
                content.push(
                    <TableRow key={data[1]}>
                        <TableCell align="left">{data[1]}</TableCell>
                        <TableCell align="left">{data[2]}</TableCell>
                        <TableCell align="left">€{data[3]}/U${(data[3]*1.12).toFixed(2)}</TableCell>
                        <TableCell align="left">{data[4]}</TableCell>
                    </TableRow>
                )
            })
            
            return(
                content
            )
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
                                <TableCell align="left">Date</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.buildList()}
                            </TableBody>
                        </Table>
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
export default History