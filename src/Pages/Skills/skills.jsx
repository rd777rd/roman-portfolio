import React from 'react'
import { Link } from 'react-router-dom'
import { Skilldescr } from '../../skilldescr'
import { Skill } from '../../Components/Skill/skill'
import{Navbar} from'../../Components/Navbar/navbar'
import "./skills.css"
export const Skills = () => {
  return (
    <div className="skillsContainer">
      <Navbar className="navbar" />
      <h1 className="skillsTitle">My Skills</h1>
      <div className="skillCards">
       {Skilldescr.map((skill,i) =>{
        return <Skill className="skillStyling" key= {i} id={skill.id} image={skill.image} skill={skill.skill} experience={skill.experience} certification={skill.certifications} />
})}
</div>
<div className='skillLinkContainer'>
      <Link className="skillLink" to="/projects">View Projects</Link>
      </div>

    </div>
  )
}
