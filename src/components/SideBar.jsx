import React from 'react'
import { Link } from 'react-router-dom'


const SideBar = () => {
    const links = [
        {
            name: "Assessment",
            link:"/"
        },
        {
            name: "Reviews",
            link:"/about"
        },
        {
            name: "Interviewees",
            link:"/profile"
        }

    ]
  return (
    <div className='sidebar'>
        {links.map((link)=>(
            <Link key={link.name} to={link.link}>{link.name}</Link>
        ))}
    </div>
  )
}

export default SideBar