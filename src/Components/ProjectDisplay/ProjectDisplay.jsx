import React from 'react'
import { Link } from 'react-router-dom'
import "./ProjectDisplay.css"

const ProjectDisplay = (props) => {
  const {project} = props;
  return (
    <div className="projectDisplayContainer">
      <div className="imageContainer">
       <img className="projectdImage" src= {project.image} alt=""/>
       </div>
     <p className="projectName">{project.name}</p>
     <p className="projectDescription dd"><span className="descriptionSpan">PROJECT DESCRIPTION:</span><br></br>{project.description}</p>
     <div className='projectdButtons'>
        <Link className="projectdButton vs" to="/">HOME</Link>
        <Link className="projectdButton vd" to= "/projects">PROJECTS</Link>
        </div>
     <p className="projectTechStack">Tech Stack: {project.techStack}</p>
    </div>
  )
}
export default ProjectDisplay
