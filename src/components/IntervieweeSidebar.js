import React from "react";
import './sidebar.css'
import {
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
} from 'cdbreact';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Intervieweesidebar(){
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
              

              <NavLink to="/acceptedassessments">
              <div>Assessments</div>
              </NavLink>

              <NavLink to="/myreviews">
              <div>My Reviewes</div>
              </NavLink>

              
              <div onClick={Logout}>Logout</div>
              
             
          </CDBSidebarMenu>
      </CDBSidebarContent>


    </div>
  );
};

export default Intervieweesidebar;

