import React from "react";
import './sidebar.css'
import {
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  div,
} from 'cdbreact';
import { Link, NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Intervieweesidebar(){

  return(
    <div className="sidebar">
      <CDBSidebarContent >
          <CDBSidebarMenu className="sidebar-content">
              

              <NavLink to="/intervieweeassessments">
              <div>Assessments</div>
              </NavLink>

              <NavLink to="/my-watchlist">
              <div>Reviewed Assessments</div>
              </NavLink>

              <NavLink to="/my-watchlist">
              <div>Logout</div>
              </NavLink>
             
          </CDBSidebarMenu>
      </CDBSidebarContent>


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