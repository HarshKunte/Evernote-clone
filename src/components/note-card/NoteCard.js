import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';

import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import moment from 'moment'
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import IconButton from '@material-ui/core/IconButton';
import ReactHtmlParser from 'react-html-parser'
import BookmarkIcon from '@material-ui/icons/Bookmark';
import ShareIcon from '@material-ui/icons/Share';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { removeHeaderTags } from '../../helper';
import { Box } from '@material-ui/core';
import { db } from '../../config';
import { useHistory } from 'react-router';
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { toast } from 'react-toastify';
const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 345,
      borderRadius:'10px',
      [theme.breakpoints.down('sm')]: {
        width:'100%'
      },
    },
   
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
   bookMark:{
     color:theme.orange
   },
   share:{
     color:theme.orange
   },
   cardContent:{
     padding: '0rem 1rem',
     maxHeight:'10rem',
     overflow:'hidden'
   },
   header:{
     fontSize:'1.3rem',
    lineHeight:1,
    fontWeight:'bold',
    color: theme.mediumGrey
     
   },
   subHeader:{
      fontSize:'0.9rem',
      lineHeight:1
   }
  }));
function NoteCard({note}) {

  const history = useHistory()
    const classes = useStyles();
 


    const bookmarkNote = (e)=>{
      e.stopPropagation()
      const currBookMarkStatus = note.bookmarked? note.bookmarked : false
      console.log(currBookMarkStatus);
      db.collection('notes').doc(note.id).update({
        bookmarked: !currBookMarkStatus
      })
      .then(()=> console.log('done'))
      .catch((e)=> console.log(e))
    }

    const gotoNote = ()=>{
      history.push(`/view-note/${note.id}`)
    }
    
    return (
        <Card className={classes.root} onClick={gotoNote}>
        <CardHeader
          classes={{title: classes.header, subheader:classes.subHeader}}
          title={note.title}
          subheader={moment(note.timestamp).format("MMM Do YYYY")}
        />
      
        <CardContent className={classes.cardContent}>
          <Box component="div" color="text.secondary" p={1} fontSize={'0.9rem'}>
          {
            note.body.length >200 ? ReactHtmlParser(removeHeaderTags(note.body.substring(0,200)+'...')) : ReactHtmlParser(removeHeaderTags(note.body)) 
          }
          </Box>
          {/* <Typography variant="body2" color="textSecondary" component="p" style={{padding:'0rem 0.5rem'}}>
          {
            note.body.length >200 ? ReactHtmlParser(removeHeaderTags(note.body.substring(0,200)+'...')) : ReactHtmlParser(removeHeaderTags(note.body)) 
          }
          </Typography> */}
        </CardContent>
        <CardActions disableSpacing>
          {
            note.bookmarked? (

          <IconButton aria-label="add to favorites" onClick={bookmarkNote} title='remove bookmark'>
            <BookmarkIcon className={classes.bookMark}  />
          </IconButton>
            ) :
            (
              <IconButton aria-label="add to favorites" onClick={bookmarkNote} title='bookmark'>
            <BookmarkBorderIcon className={classes.bookMark} />
          </IconButton>
            )
          }
             <IconButton aria-label="share" onClick={(e)=> e.stopPropagation()}>
                <CopyToClipboard text={`${URL}view-note/${note.id}`}
                                                onCopy={()=>{toast('Note URL copied.',{type:'success'})}}
                                            >
                                                <ShareIcon className={classes.share} titleAccess='share' />
                                            </CopyToClipboard>
                  
                    </IconButton>
        
        </CardActions>
      
      </Card>
    )
}

export default NoteCard
