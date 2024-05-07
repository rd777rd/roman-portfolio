import React from 'react'
import { Link } from 'react-router-dom'
import "./project.css"

export const Project = (props) => {
  return (
    <div className="projectContainer">
      <div className="projectCard>">
      <Link className="projectName" to= {`/project/${props.id}`}><p>{props.name}</p></Link>
        <img className="projectImage" src= {props.image} alt=""/>

        <p className='projectDescription'><span className="descriptionSpan">PROJECT DESCRIPTION:</span><br></br>{props.description}</p>
        <div className='projectButtons'>
        <Link className="projectButton vs" to={props.link}>Visit site</Link>
        <Link className="projectButton vd" to={`/project/${props.id}`}>Details</Link>
        </div>
        <p className="projectTechStack">Tech Stack: {props.techStack}</p>
    </div>
    </div>
  )
}
