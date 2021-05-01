import React, { useState, useEffect } from 'react'
import Container from '@material-ui/core/Container';
import { ThemeProvider, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Button from '@material-ui/core/Button';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Grid from '@material-ui/core/Grid';
import ListIcon from '@material-ui/icons/List';
import ViewModuleIcon from '@material-ui/icons/ViewModule';
import styles from './homeStyles';
import CardUi from '../../components/card-ui/CardUi';
import ListUi from '../../components/list-ui/ListUi';
import { useHistory } from "react-router-dom";
import BookmarkIcon from '@material-ui/icons/Bookmark';
import CancelIcon from '@material-ui/icons/Cancel';
import CircularProgress from '@material-ui/core/CircularProgress';
import Hidden from '@material-ui/core/Hidden';
import welcome from '../../images/welcome.svg'
import empty from '../../images/empty.svg'
import { db } from '../../config';
import firebase from 'firebase/app'
import 'firebase/auth'
function Home({classes,user,setUser}) {
  let provider = new firebase.auth.GoogleAuthProvider();

  const [listView, setListView] = useState(false)
  const [gridView, setGridView] = useState(true)
  const [bookmarkedOnly, setBookmarkedOnly] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [notes, setNotes] = useState([])
  
  
  const signIn =()=>{
    firebase.auth().signInWithPopup(provider)
    .then(result=>{
     setUser(result.user.uid)
    })
  }
  
  useEffect( async () => {
   
    if(user){
    const unsub=  await db.collection('notes').where('owner', '==', user).orderBy('timestamp','desc').onSnapshot(snap =>{
        const notes  = snap.docs.map(doc =>{
          const data = doc.data()
          data.timestamp= doc.data().timestamp && doc.data().timestamp.toDate()
          data.id = doc.id
          return data
        })
       console.log(notes);
        setNotes(notes)
        setIsLoading(false)
      })
      return () => {
       unsub()
      }
     
    }
    else{
      setNotes([])
    }
    }, [user])
  


  const enableList = ()=>{
    setGridView(false)
    setListView(true)
  }
  const enableCards = ()=>{
    setListView(false)
    setGridView(true)
  }

  const showBookmarks =()=>{
    setBookmarkedOnly(!bookmarkedOnly)
  }
 

  const history = useHistory()

  // if(isLoading){
  //   return (
  //     <Container   maxWidth="xlg"  className={classes.mainContainer}>

  //     <CircularProgress  className={classes.loader}/>
  //     </Container>
  //   )
  // }

    return (
      <>
      {
        !user? (
          <Container   maxWidth="xlg"  className={classes.mainContainer}>
            <div className={classes.loginContainer}>

            <Typography variant="h4" color='textSecondary' style={{fontWeight:'bold'}} gutterBottom className={classes.welcomeTitle}>
       Welcome to Notey.
      </Typography>
            <Typography variant="p" color='textSecondary' style={{fontWeight:'bold'}} gutterBottom>
       Create and share notes with ease. Sign In to get started.
      </Typography>
           
      <Button
        variant="contained"
        color="default"
        className={classes.button}
        startIcon={<AccountCircleIcon />}
        onClick={signIn}
        >
        Sign in with Google
      </Button>

          <img src={welcome} alt="welcome image" className={classes.welcomeImg}/>
        </div>
          </Container>
        ):(
          <div className={classes.root}>
          <Container   maxWidth="xl"  style={{minHeight:'100%', padding:'1rem 1.5rem',}}>
   <Grid container spacing={3} >
     <Grid item xs={12} sm={4} md={4} className={classes.addNoteContainer} >
       <div className={classes.welcomeDiv}>

         <p>Welcome to Notey!!</p>
         <Typography variant="body2" color="textSecondary" component="p">
        Create, bookmark and share your notes with anyone easily. 
       </Typography>
      
       </div>
      
     <Button
     variant="outlined"
     onClick={()=>history.push('/add-note')}
     className={classes.button}
     startIcon={<AddCircleIcon />}
   >
     Add Note
   </Button>
   <Hidden xsDown>
          <img src={welcome} alt="welcome image" className={classes.welcomeImg}/>
        </Hidden>
     </Grid>
     <Grid item xs sm md className={classes.notesContainer}>
      
        {
          notes.length==0 ? (
            <Container className={classes.noDataDiv}>
                 <Typography variant="h5" color='textSecondary' style={{fontWeight:'bold'}} gutterBottom className={classes.welcomeTitle}>
       You don't have any notes!!
      </Typography>
              <img src={empty} alt="no notes" className={classes.noNotesImg}/>
            </Container>
          ):
          (
            <>
      <div className={classes.listTop}>
      <Typography variant="body2" color="textSecondary" component="p" className={classes.noteCount}>
        {`${bookmarkedOnly? (notes?.filter((note)=> note.bookmarked===true).length) : notes?.length} notes`} 
       </Typography>
     
       <IconButton
             aria-label="view as list"
             aria-haspopup="true"
             className={classes.filterIcons}
             title='view as list'
             onClick={enableList}
           >
             <ListIcon />
           </IconButton>
           <IconButton
             aria-label="view as cards"
             aria-haspopup="true"
             className={classes.filterIcons}
             onClick={enableCards}
             title='view as cards'
           >
             <ViewModuleIcon />
           </IconButton>

           {
            bookmarkedOnly? (

          <IconButton aria-label="show all" className={classes.filterIcons}  onClick={showBookmarks} title='cancel'>
             <CancelIcon  />
          </IconButton>
            ) :
            (
              <IconButton aria-label="show bookmarks" className={classes.filterIcons}  onClick={showBookmarks} title='bookmarked only'>
           
            <BookmarkIcon  />
          </IconButton>
            )
          }
          
           </div>
           { gridView && <CardUi notes={notes} bookmarkedOnly={bookmarkedOnly} />}
      {listView && <ListUi notes={notes} bookmarkedOnly={bookmarkedOnly}/>}
           </>
          )
        }
     
     
     </Grid>

   </Grid>
      </Container>
     </div>
        )
      }
       </>
    )
}

export default withStyles(styles)(Home)
