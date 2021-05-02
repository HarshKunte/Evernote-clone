import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import firebase from 'firebase'
import 'firebase/auth'
import styles from './navbarStyles';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router';

function Navbar({classes ,darkMode,setDarkMode}) {
  const history = useHistory()
  const user = firebase.auth().currentUser

  const logOut = ()=>{
   
    firebase.auth().signOut().then(() => {

        toast("Signed out successfully!!", {
            type: 'success'
        })
        history.push('/')
    })
  }
 
  return (
    <div className={ darkMode ? classes.darkModeRoot : classes.root }>
     
      <AppBar className={ darkMode ? classes.appBarDark : classes.appBarLight} position="static">
        <Toolbar>
      
          <Typography variant="h6" className={classes.title}>
            Notey
          </Typography>
         
          {user && (
            <div>
                <Button color="inherit" onClick={logOut}>Logout</Button>
            
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default withStyles(styles)(Navbar)
