import React from 'react'
import "./navbar.css"
import { Link } from "react-router-dom";
export const Navbar = () => {
  return (
    <div className='navbarContainer'>
      <div className="menuContainer">
      <ul className="navbarMenu">
        <li className="menuItem"><Link to= '/' className="menuLink">Home</Link></li>
        <li className="menuItem"><Link to= '/about' className="menuLink">About</Link></li>
        <li className="menuItem"><Link to= '/projects' className="menuLink">Projects</Link></li>
        <li className="menuItem"><Link to= '/skills' className="menuLink">Skills</Link></li>
      </ul>
      </div>
    </div>
  )
}

export default Navbar