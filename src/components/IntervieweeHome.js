import React from "react";
import Intervieweesidebar from "./IntervieweeSidebar";
import Navigationbar from "./Navbar";


function IntervieweeHome(){

    return(
      <div className='page'>
        <div id="intervieweehomepage-bg"></div>
        <Navigationbar />
        <div className="display">
          <Intervieweesidebar />
          
          <div className="content">
            
          </div>
        </div>

      </div>






    
    );
};

export default IntervieweeHome;
