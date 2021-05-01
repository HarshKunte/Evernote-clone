import { useEffect, useState } from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

import { app} from './config';
import Navbar from './components/navbar/Navbar';
import { ThemeProvider, withStyles, createMuiTheme } from '@material-ui/core';
import Home from './pages/home/Home';
import AddNote from './pages/add-note/AddNote';
import ViewNote from './pages/view-note/ViewNote';
import PageNotFound from './pages/pagenotfound/PageNotFound';
import Footer from './components/footer/Footer';

const theme = createMuiTheme({
  overrides: {
    MuiCssBaseline: {
      '@global': {
        body: {
          fontSize: '1rem',
    lineHeight: 1,
    
    backgroundColor: "white",
        },
      },
    },
  },
  typography: {
    "fontFamily": `"Open Sans","Roboto", "Helvetica", "Arial", sans-serif`
   },
 orange:  '#fd9f24',
  lightGrey: '#b9b9b9',
  mediumGrey:'#595a59',
  darkGrey:'#3d3d3d',
  lightBg:'#f5f4f4',

  // lightBg:'#fafafa'  
});


function App() {
  const [selectedNoteIndex, setSelectedNoteIndex] = useState(null)
  const [selectedNote, setSelectedNote] = useState(null)
  const [user, setUser] = useState(null)
  const [isTyping, setIsTyping] = useState(false)


  useEffect(() => {
    app.auth().onAuthStateChanged(async (user) => {
      if(user)
      setUser(user.uid)
      else
      setUser(null)
      console.log(user);
    })
  }, [])



  return (
    <div className="app-container">
    <ToastContainer />
    
    <ThemeProvider theme={theme}>

      <CssBaseline />
      <Router>
        <Navbar/>
        <Switch>
            <Route path='/' exact >
                <Home user={user} setUser={setUser} />
              </Route>
            <Route path='/add-note' exact  >
              <AddNote user={user}/>
            </Route>
            <Route path='/view-note/:id' exact >
              <ViewNote user={user}/>
            </Route>
           
            <Route exact path="*" component={PageNotFound} />

          </Switch>
          <Footer/>
       
    </Router>
    </ThemeProvider>
    </div>
  );
 
}

export default App;
