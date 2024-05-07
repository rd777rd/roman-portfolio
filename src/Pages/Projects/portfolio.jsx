import React from 'react'
import {Projects} from '../../all_projects'
import { Project } from '../../Components/Project/project'
import{Navbar} from'../../Components/Navbar/navbar'
import"./projects.css"
export const Portfolio = () => {
  return (
    <div className="projectsPage">
      <Navbar className="navbar" />
      <h1 className="projectsTitle">My Projects</h1>
      <div className="projects">
     {Projects.map((project,i) =>{
        return <Project className="project" key= {i} id={project.id} name={project.name} image={project.image} description={project.description} techStack={project.techStack} link={project.link} />
})}
</div>
 </div>
  )
}
