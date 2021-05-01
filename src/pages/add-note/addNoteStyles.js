const styles = theme =>({
 
    inputContainer:{
        padding:'0.5rem',
        marginBottom:'0.5rem',
        background: theme.lightBg
    },
    saveButton:{
      fill: theme.orange,
      cursor:'pointer',
      [theme.breakpoints.down('sm')]: {
        fontSize:'1.5rem'
      },
    },
    editButton:{
      [theme.breakpoints.down('sm')]: {
        fontSize:'1.5rem'
      },
    },
    delButton:{
      fill: theme.mediumGrey,
      cursor:'pointer',
      [theme.breakpoints.down('sm')]: {
        fontSize:'1.5rem'
      },
    },
    }
    
)

export default styles