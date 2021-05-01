import React, { useEffect, useState } from 'react'
import { withStyles } from '@material-ui/core/styles';
import styles from './viewNoteStyles';
import { useHistory, useParams } from 'react-router';
import { db } from '../../config';
import AddNote from '../add-note/AddNote';
import ReadOnlyNote from '../../components/readonly-note/ReadOnlyNote';

import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';

function ViewNote({classes, user}) {
    const history = useHistory()
  
    const params = useParams()
    const [note, setNote] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    useEffect(async () => {
        await db.collection('notes').doc(params.id).get()
        .then((doc)=>{
            if(doc.exists){
                setNote({ id:doc.id,title:doc.data().title, body: doc.data().body, owner:doc.data().owner})
                setIsLoading(false)
            }
        })
        return () => {
           
        }
    }, [params.id])

    if(isLoading){
        return (
          <Container   maxWidth="xlg"  className={classes.mainContainer}>
    
          <CircularProgress  className={classes.loader}/>
          </Container>
        )
      }

    return (
        <div>
            {user && note?.owner==user?
             ( <AddNote note={note}/>) :
             (<ReadOnlyNote note={note}/>)
            
            }
            
        </div>
    )
}

export default withStyles(styles)(ViewNote)
