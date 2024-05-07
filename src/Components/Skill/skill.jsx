import { Link } from "react-router-dom"
import "./skill.css";
export const Skill = (props) => {
    return (
      <div className="skillContainer">
        <div className="skillCard">
        <p className="skillSkill">{props.skill}</p>
        <img className="skillImage" src= {props.image} alt=""/>
          <p className="skillExperience">Experience: {props.experience}</p>  
      </div>
      </div>
    )
  }
  