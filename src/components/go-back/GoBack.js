import React from 'react'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { useHistory } from 'react-router';
function GoBack() {
    const history = useHistory()
    return (
        <div 
         style={{width:'100%', display:'flex', alignItems:'center', padding:'0.5rem 1rem',paddingLeft:'4%'}}>
            <ArrowBackIosIcon onClick={()=> history.push('/')} style={{cursor:'pointer'}}/>
            <p onClick={()=> history.push('/')}>Go Back</p>
        </div>
    )
}

export default GoBack
