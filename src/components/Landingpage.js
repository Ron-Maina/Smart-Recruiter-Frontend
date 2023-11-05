import React from "react";
import {Link} from 'react-router-dom'


function Landingpage() {
 
  return (
    <div className="page">
      <div id="landing-bg"></div>
      <div className="header">
        <h4 className='top-left'><span>SMART</span> <text>RECRUITOR</text></h4>
        <div className='top-right' style={{display: 'flex', columnGap: '30px'}}>

          <div className="dropdown-toggle">
            <Link to = '/signin' className="link_to"><span>SIGN IN</span></Link>
          </div>

          <div className="dropdown-toggle">
            <Link to = '/signup' className="link_to"><span style={{marginLeft: '10px'}}>SIGN UP</span></Link>
          </div>
        </div>

      </div>

      <div className="absolute top-[200px] left-[140px] inline-block w-[1150px] text-[64px]" style={{marginLeft: '20%'}}>
        <p className="text-white">
          <b><span>Welcome to</span></b>
        </p>
        <p className="mt-0 text-[128px] font-quicksand text-white">
          <b><span>Smart Recruiter</span></b>
        </p>
      </div>
     
     
      <div className="absolute top-[450px] left-[300px] text-[32px] font-medium text-deepskyblue" style={{marginLeft: '20%'}}>
        <p className="m-0">
          <span className="text-white">AUTOMATE</span>
          <span className="text-white">{` `}</span>
          <span className="text-yellow-300">YOUR RECRUITMENT PROCESS!</span>
        </p>
      </div>
    </div>
  );
}

export default Landingpage;
