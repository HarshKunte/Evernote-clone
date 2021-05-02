import React, { useState } from 'react'
import { withStyles } from '@material-ui/core/styles';
import styles from './addNoteStyles';
import ReactQuill from 'react-quill';
import Container from '@material-ui/core/Container';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import GoBack from '../../components/go-back/GoBack';
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded';
import DeleteIcon from '@material-ui/icons/Delete';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import firebase from 'firebase'
import 'firebase/auth'
import { db, timestamp } from '../../config';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router';
function AddNote({classes, note, user}) {

    const history = useHistory()
    const [title, setTitle] = useState(note? note.title:'')
    const [body, setBody] = useState(note? note.body: '')
    const [error, setError] = useState(false)
    const saveNote =()=>{
        if(note){
            
            db.collection('notes').doc(note.id).update({
                title:title,
                body:body,
                timestamp: timestamp
            })
            .then(()=>{
                toast('👍 Note updated!',{type:'success'})
            })
            .catch((e)=>{
                toast('😟Some error occurred!',{type:'error'})
                console.log(e);
            })
        }else{
        if(!title) setError(true)
        console.log(title);
        console.log(body);
        if(title){
        db.collection('notes').add({
            owner:user,
            title:title,
            body:body,
            timestamp, timestamp
        })
        .then((docRef)=>{
            toast('👍 Note created sccessfully',{type:'success'})
            history.push('/')
        })
        .catch((e)=>{
            toast('😟Some error occurred!',{type:'error'})
            console.log(e);
        })
        }
        }
       
    }

    const handleTitleChange =(e)=>{
        if(error)
        setError(false)
        setTitle(e.target.value)

       
    }

    const deleteNote=()=>{
        if(note){
            if(window.confirm('Are you sure you want to delete this note?'))
            db.collection('notes').doc(note.id).delete()
            .then(()=>{
                toast('👍 Note deleted!',{type:'warning'})
                history.push('/')
            })
            .catch((e)=>{
                toast('😟Some error occurred!',{type:'error'})
                console.log(e);
            })
        }
    }
    
    return (
        <>
        <GoBack/>
        <Container maxWidth="lg" style={{minHeight:'80vh'}} className={classes.root}>
            
            <Grid container spacing={1} alignItems="flex-end" className={classes.inputContainer}>
          <Grid item>
            <EditIcon className={classes.editButton} />
          </Grid>
          <Grid item xs>
            <TextField
            error={error}
            helperText={error && "Title required"} 
            focused={note? note.title? true: false : null}
            value={title}
            id="standard-error-helper-text"
             id="input-with-icon-grid" label="Enter Title " required onChange={handleTitleChange}/>
          
          </Grid>
          <Grid item>
          <CheckCircleRoundedIcon onClick={saveNote} titleAccess="save"
           fontSize={'large'} className={classes.saveButton} />
          </Grid>
          {
              note ? (
                <Grid item>
                <DeleteOutlineIcon  titleAccess="delete" onClick={deleteNote}
                 fontSize={'large'} className={classes.delButton} />
                </Grid>
              ) : null
          }
         
        </Grid>
        
            <ReactQuill
             style={{height:'55vh'}} onChange={(e)=>setBody(e)} value={body} />
        </Container>
        </>
    )
}

export default withStyles(styles)(AddNote)
