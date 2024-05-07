import React from 'react'
import { Link } from 'react-router-dom'
import{Navbar} from'../../Components/Navbar/navbar'
import"./about.css"
export const About = () => {
  return (
    <div className="aboutPage">
      <Navbar className="navbar" />
    <div className="aboutContainer">
      <div className="aboutSection">
      <div className='aboutTextContainer'>
      <h1 className="aboutTitle">About Me</h1>
      <p className="aboutText">I am Roman Drake, a 21 year old front-end developer. Using responsive web designs, I develop the front-end of websites.</p>
      <div className="aboutButtonsContainer">
      <Link className="aboutButton vs" to="/skills">View Skills</Link>
      <Link className='aboutButton vp' to="/projects">View Projects</Link>
      </div>
      </div>
      </div>
      <div className='contactSection'> 
        <div className="contactInfoContainer">
        <h1 className="contactTitle">Contact Me</h1>
        <div className='phoneSection'>
          <h1 className="phoneTitle">Phone Number</h1>
          <p className="phoneText">317-731-2570</p>
          <hr className="seperate"></hr>
          <h1 className="emailTitle">Email</h1>
          <a href="mailto:roman.drake.7@gmail.com" className="emailLink">
              Click to email
            </a>
        </div>
        </div>
      </div>
    </div>
    </div>
  )
}
