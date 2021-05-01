import React from 'react'
import pagenotfound from '../../images/404.svg'
function PageNotFound() {
    return (
        <div style={{width:'100%',height:'70vh',padding:'0.5rem', display:'flex',flexDirection:'column',justifyContent:'center', alignItems:'center'}}>
            <h1>Page Not Found</h1>
            <img src={pagenotfound} alt="404 page not found"
            style={{width:'90%', height:'25vh'}}
            />
        </div>
    )
}

export default PageNotFound
