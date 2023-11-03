import React from 'react'
import { Link } from 'react-router-dom'

export const Navbar = () => {
    const links = [
        {
            name: "Home",
            link:"/"
        },
        {
            name: "About",
            link:"/about"
        },
        {
            name: "Feedback",
            link:"/feedback"
        },
        {
            name: "Logout",
            link:"/profile"
        }

    ]
  return (
    <div className='navbar'>
        <h3>Smart Recruiter</h3>
        <nav>
        {links.map((link)=>(
            <Link key={link.name} to={link.link}>{link.name}</Link>
        ))}
        </nav>
    </div>
  )
}
