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
export default function Structure(props) {
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
    setOpen(false);
  };

  function loginItens(){
    // window.localStorage.setItem('name', `${response.data.name}`)
    if(window.localStorage.getItem('name')){
      return(
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>Orders History</MenuItem>
          <MenuItem onClick={handleClose}>Logout</MenuItem>
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
      <div className="structure">
        <div className="header">
          <div className="headerTitle">
            <img src={logo} alt="Logo" className="logoImage" />
          </div>
          <div className="cart">
            <IconButton color="inherit" aria-label="menu">
              <Badge badgeContent={1} color="secondary">
                <ShoppingCartIcon />
              </Badge>
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
                  label="Email Address"
                  type="email"
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
        <div className="content">
            {props.page}
        </div>
        <div className="footer">
          <div className="copyright">
            <p>© Felipe França Nogueira</p>
          </div>
        </div>
      </div>
    );
  }