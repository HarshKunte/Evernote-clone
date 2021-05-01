import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import ReactQuill from 'react-quill';
const useStyles = makeStyles((theme) => ({
  root: {
     
     height:'84vh',
     width:'100%',
    
  },
  paper:{
      height:'100%',
      padding:'1rem'
  },
  textDiv:{
      padding:'0.5rem 1rem'
  },
  title:{
      background:theme.lightBg,
      padding:'1rem',
      marginBottom:'0.5rem'
  }
}));
function ReadOnlyNote({note}) {
    const classes = useStyles();
    return (
        <Container maxWidth='md' className={classes.root}>
                <div className={classes.title}>

            <h2 >{note? note.title: ''}</h2>
                </div>
            
            {note ? <ReactQuill style={{height:'60vh'}}  modules={{toolbar:false}} value={note.body} readOnly  />: ''}
           
           
        </Container>
    )
}

export default ReadOnlyNote
