import React from "react";
import './sidebar.css'
import {
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Intervieweesidebar(){

    return(
      <div id="sidebar">
        <>
          <CDBSidebarContent className="sidebar-content">
              <CDBSidebarMenu id = 'sidebar-menu'>

                  <Link to="/homepage">
                    <div id= 'sidebar-items' style={{color: 'black'}}>Assessments</div>
                  </Link>

                  <Link to="/contactspage">
                      <div id= 'sidebar-items'>Feedback</div>
                  </Link>
                  
              </CDBSidebarMenu>
          </CDBSidebarContent>
          <CDBSidebarFooter style={{ textAlign: 'center' }}>
              
                  <div className="sidebar-btn-wrapper" style={{marginBottom: '20px'}}>
                      <h6><span>Smart</span> Recruiter</h6>
                  </div>
              
          </CDBSidebarFooter>
      </>
      </div>
    );
};

export default Intervieweesidebar;

{/* <div className="absolute top-[183px] left-[64px] rounded-xl bg-[#324c59] bg-opacity-70 box-border w-[247px] h-[540px] border-[2px] border-solid border-lightgoldenrodyellow" />
      <div className="absolute top-[270px] left-[105px] text-xl font-semibold text-[#0cc2fa] inline-block w-[234px] h-[29px]">
        Assessments
      </div>
      <div className="absolute top-[385px] left-[105px] text-xl font-semibold text-[#0cc2fa] inline-block w-[234px] h-[29px]">
        Feedback
      </div> */}