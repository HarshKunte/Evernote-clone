const styles = theme =>({
    root: {
        flexGrow: 1,
        height:'8vh',
        padding:'0 4%'
      },
      menuButton: {
        marginRight: theme.spacing(2),
      },
      title: {
        flexGrow: 1,
        fontWeight:'bold',
        fontSize:'1.5rem'
      },
      appBarLight:{
          background: 'white',
          boxShadow:'none',
        color:theme.orange,

          // color:'#e79b3d'
      },
filterIcons:{
  color:theme.darkGrey
}
})

export default styles