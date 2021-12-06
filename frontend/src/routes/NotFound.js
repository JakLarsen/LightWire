


                    //REACT 404 NOT FOUND



            //IMPORTS AND SETUP



import React from "react"
import '../css/NotFound.css'
import '../css/Widgets.css'



            //404 NOTFOUND COMPONENT



const NotFound = ({goBack}) => {

    return (
        <div className="NotFound"> 
            <div className="back-btn" onClick={goBack}>Back</div>
            <div className="NotFound-msg">Sorry, we can't find what you're looking for.</div>
        </div>
    )
}

export default NotFound