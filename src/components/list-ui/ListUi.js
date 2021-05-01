import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import IconButton from '@material-ui/core/IconButton';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import Typography from '@material-ui/core/Typography';
import Slide from '@material-ui/core/Slide'
import ShareIcon from '@material-ui/icons/Share';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import moment from 'moment'
import { db } from '../../config';
import { useHistory } from 'react-router';
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { toast } from 'react-toastify';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      overflowX:'hidden'
      
    },
    inline: {
      display: 'inline',
    },
    listItem:{

      background:'white'
    },
    primary:{
      fontWeight:'bold',
      color:theme.mediumGrey,
    },
    icon:{
      fill:theme.orange
    }
  }));
function ListUi({notes, bookmarkedOnly}) {
    const URL = process.env.REACT_APP_URL
    console.log(URL);
    const history = useHistory()
    const classes = useStyles();

    const bookmarkNote = (e,note)=>{
      e.stopPropogation()
      const currBookMarkStatus = note.bookmarked? note.bookmarked : false
      console.log(currBookMarkStatus);
      db.collection('notes').doc(note.id).update({
        bookmarked: !currBookMarkStatus
      })
      .then(()=> console.log('done'))
      .catch((e)=> console.log(e))
    }
    
    const gotoNote = (id)=>{
      history.push(`/view-note/${id}`)
    }
    const copyUrl =()=>{
      toast('Note URL Copied.', { type: 'success' })
    }

    const list = {
      visible: {
       
        transition: {
          when: "beforeChildren",
          staggerChildren: 0.3,
        },
      },
      hidden: {
       
       
      },
    }

    const item = {
      visible: {  x: 0, transition:{
        ease: 'easeIn'
      } },
      hidden: { x: '-100%' },
    }

    if(bookmarkedOnly && (notes?.filter((note)=> note.bookmarked===true)).length==0){
      return (
      <div style={{width:'100%', textAlign:'center'}}>

        <Typography variant="h5"  color='textSecondary' style={{fontWeight:'bold'}} gutterBottom>
       You don't have any bookmarked notes!!
      </Typography>
      </div>
       
      )
    }

    return (
    
      <List className={classes.root}>
        {

           (bookmarkedOnly? ( (notes?.filter((note)=> note.bookmarked===true))) : notes)?.map((note,index)=>(
              
         
                <React.Fragment key={note.id} > 
             <Slide 
                direction="right"
                timeout={{ appear: (notes.length-index+1), enter: (notes.length-index+1)*(notes.length>2? 150: 500), exit: (index+1)*200 }}
                in={true}
                mountOnEnter
                unmountOnExit
              >
         
           <div>
            <ListItem 
            alignItems="flex-start" onClick={()=>gotoNote(note.id)} className={classes.listItem}>
         
              <ListItemText classes={{primary:classes.primary}}
                primary={note.title}
                secondary={
                  <React.Fragment>
                    { moment(note.timestamp).fromNow()}
                  
                  </React.Fragment>
                }
              />
                <ListItemIcon>
                <IconButton aria-label="share" onClick={(e)=> e.stopPropagation()}>
                <CopyToClipboard text={`${URL}/view-note/${note.id}`}
                                                onCopy={copyUrl}
                                            >
                                                <ShareIcon className={classes.icon} />
                                            </CopyToClipboard>
                  
                    </IconButton>
                  </ListItemIcon>
                <ListItemIcon>
                          {
                      note.bookmarked? (

                    <IconButton aria-label="add to favorites" onClick={()=>bookmarkNote(note)}>
                      <BookmarkIcon className={classes.bookMark} />
                    </IconButton>
                      ) :
                      (
                        <IconButton aria-label="add to favorites" onClick={()=>bookmarkNote(note)}>
                      <BookmarkBorderIcon className={classes.bookMark} />
                    </IconButton>
                      )
                    }
                  </ListItemIcon>

             </ListItem>
          
            
          {index===notes.length-1 ? null : <Divider  component="li" /> }
          </div>
            </Slide>
           </React.Fragment>
         
          ))
        }
        
       
      </List>
      
    );
}

export default ListUi
