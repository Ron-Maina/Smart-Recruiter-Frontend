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

function RecruiterSidebar(){
  const navigate = useNavigate()

  function Logout(){
    fetch("/recruiterlogout", {
        method: "DELETE",
    })

    navigate("/", {replace: true})
  }

  return(
    <div className="sidebar">
      <CDBSidebarContent >
          <CDBSidebarMenu className="sidebar-content">
              

              <NavLink to="/recruiterassessments">
              <div> Assessments</div>
              </NavLink>

              <NavLink to="/newassessment">
              <div>Create Assessment</div>
              </NavLink>

             
              <div onClick={Logout}>Logout</div>
              
             
          </CDBSidebarMenu>
      </CDBSidebarContent>


    </div>
  );
};

export default RecruiterSidebar;

