import React,{useState} from 'react';
import './index.css';
import logo from '../../Images/logo_3.jfif'
import AccountCircle from '@material-ui/icons/AccountCircle';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import PizzaOrders from '../../Core/PizzaOrders'
export default function Header(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCloseLogin = () => {
    PizzaOrders.postLogin(document.getElementById('user').value,document.getElementById('password').value).then((response) => {
      if(response.data.data[0] === undefined)
        alert('Incorrect username or password')
      else
        window.localStorage.setItem('loginPizza', `${response.data.data[0][0]}`)
    })
    setOpen(false);
  };

  const handleLogOut = () =>{
    window.localStorage.clear()
    setAnchorEl(null);
  }

  function loginItens(){
    if(window.localStorage.getItem('loginPizza')){
      return(
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>Orders History</MenuItem>
          <MenuItem onClick={handleLogOut}>Logout</MenuItem>
        </Menu>
      )
    }
    else{
      return(
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClickOpen}>Login</MenuItem>
        </Menu>
      )
    }
  }

    return (
        <div className="header">
          <div className="headerTitle">
            <a href='/'><img src={logo} alt="Logo" className="logoImage" /></a>
          </div>
          <div className="cart">
            <IconButton color="inherit" aria-label="menu">
              <a href="/cart"><Badge badgeContent={window.localStorage.getItem('quantity')} color="secondary">
                <ShoppingCartIcon />
              </Badge>
              </a>
            </IconButton>
          </div>
          <div className="login">
            <div class="dropdown">
              <IconButton color="inherit" aria-label="menu" onClick={handleClick}>
                <AccountCircle />
              </IconButton>
              {loginItens()}
            </div>
            <Dialog open={open} onClose={handleCloseLogin} aria-labelledby="form-dialog-title">
              <DialogTitle id="form-dialog-title">Login</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Welcome to the Holly Pizza!
                </DialogContentText>
                <TextField
                  autoFocus
                  margin="dense"
                  id="user"
                  label="Email"
                  type="text"
                  fullWidth
                />
                <TextField
                  autoFocus
                  margin="dense"
                  id="password"
                  label="Password"
                  type="password"
                  fullWidth
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseLogin} color="primary">
                  Login
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        </div>
    );
  }