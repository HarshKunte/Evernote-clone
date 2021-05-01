const styles = theme =>({
    gridContainer:{
       
        display:'flex',
        overflowY:'hidden'
        
    },
    
    gridItem:{
        [theme.breakpoints.down('sm')]: {
            display:'flex',
            justifyContent:'center'
          },
       
    }
})

export default styles