const styles = theme => ({
    main:{
        backgroundColor:theme.lightBg,
        minHeight:'84vh'
    },
   
    button:{
        margin: theme.spacing(1),
        color: 'white',
        backgroundColor:theme.orange,
        width:'80%',
        border:'none',
        margin:'2rem 0',
        '&:hover':{
        backgroundColor:'orange',
           
        }
    },
    loader:{
        color:theme.orange
    },
    mainContainer:{
        minHeight:'92vh', padding:'1rem 1.5rem',display:'flex',justifyContent:'center',alignItems:'center', flexDirection:'column'
    },
   
    addNoteContainer:{
        display: 'flex',
        flexDirection:'column',
        alignItems:'center', 
            
    },
    loginContainer:{
        width:'50%',
        height:'70%',
        textAlign:'center',
        [theme.breakpoints.down('sm')]: {
            width:'100%'
          },
          
    },
    welcomeDiv:{
        marginTop:'5rem',
        fontSize:'1.2rem',
        textAlign:'center',
        [theme.breakpoints.down('md')]: {
            marginTop:'1rem',
            fontSize: '1rem',
          },
    },
    welcomeImg:{
        height:'18rem',
        width:'80%'
    },
    welcomeTitle:{
        [theme.breakpoints.down('sm')]: {
           
            fontSize: '1.4rem',
          },
    },
   
    listTop:{
        display:'flex',
        padding:'0.5rem 1rem',
        alignItems:'center',
        width:'100%',
    },
    noteCount:{
        flexGrow:1
    },
    tagLineDark:{
        color:theme.lightGrey
    },
    noDataDiv:{
        display:'flex',
        flexDirection:'column',
        textAlign:'center',
        width:'100%',
        height:'100%',
        justifyContent:'center',
        alignItems:'center'
    },
    noNotesImg:{
        width:'100%',
        height:'10rem'
    }

   
})

export default styles