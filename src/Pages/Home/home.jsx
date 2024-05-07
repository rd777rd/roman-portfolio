import React from 'react'
import { Link } from 'react-router-dom'
import "./home.css"
import homeimg from "../../assets/images/homeimg.png"
export const Home = () => {
  return (
    <div className="homeContainer">
          <h1 className="homeTitle">ROMAN DRAKE'S PORTFOLIO</h1>
          <div className="homeListContainer">
          <ul className="homeList">
            <li className="homeListItem"><Link to='/about' className="homeListItemLink">About Me</Link></li>
            <li className="homeListItem"><Link to='/skills' className="homeListItemLink">Skills</Link></li>
            <li className="homeListItem"><Link to='/projects' className="homeListItemLink">Projects</Link></li>
          </ul>
        </div>
        <div className="homeAboutContainer">
        <div className="homeNameContainer">
            <h1 className="homeName">Roman Drake</h1>
          </div>
          <div className="homeImgContainer">
            <img src={homeimg} className='homeImg'></img>
          </div>
          <div className="homeRoleContainer">
            <h1 className="homeRole">Web Developer</h1>
          </div>
        </div>
    </div>
  )
}
