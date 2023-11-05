import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';

function Navigationbar() {
  return (
    <>
      <Navbar data-bs-theme="dark">
        <Container>
          <div>
            <Nav.Link className='top-left' style={{top:'0px', fontFamily: 'monospace'}}><span>SMART</span> <text> RECRUITER</text></Nav.Link>
          </div>
          <div className="top-right" style={{marginLeft: '100vh', top: '0px', display: 'flex', columnGap: '30px'}}>
            <NavLink to="/" className='link_to'><text>HOME</text></NavLink>
            <Nav.Link ><span>ABOUT</span></Nav.Link>
            <Nav.Link ><span>PROFILE</span></Nav.Link>
          </div>
        </Container>
      </Navbar>
    </>
  )
}

export default Navigationbar