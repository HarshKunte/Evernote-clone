import React from 'react'
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import NoteCard from '../note-card/NoteCard';
import styles from './cardUiStyles';
import Typography from '@material-ui/core/Typography';
import Slide from '@material-ui/core/Slide'


function CardUi({classes, notes, bookmarkedOnly}) {

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
        <Grid container spacing={3} className={classes.gridContainer}
        >
            {
              ( bookmarkedOnly? ( notes?.filter((note)=> note.bookmarked===true)): (notes))?.map((note,index)=>(
                <Slide  key={note.id}
                direction="down"
                timeout={{ appear: (index+1), enter: (index+1)*(notes.length>2? 150: 500), exit: (index+1)*200 }}
                in={true}
                mountOnEnter
                unmountOnExit
              >
                    <Grid item xs={12} sm={6} md={4} className={classes.gridItem}>
                      <NoteCard note={note}/>

                    </Grid>
                    </Slide>
              

              ))
            }
            

       
     
        </Grid>
    )
}

export default withStyles(styles)(CardUi)
