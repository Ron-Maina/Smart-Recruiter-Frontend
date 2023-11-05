import React from "react";
import RecruiterSidebar from "./RecruiterSidebar";
import Navigationbar from "./Navbar";

function RecruiterHome(){

    return(
      <div className='page'>
      <div id="intervieweehomepage-bg"></div>
      <Navigationbar />
      <div className="display">
        <RecruiterSidebar />
        
        <div className="content">
          
        </div>
      </div>

    </div>
    

    )

}

export default RecruiterHome;