import React from 'react'
import "./breadcrums.css"
const Breadcrum = (props) => {
    const {project} = props;
  return (
    <div className="breadcrumContainer">
        <p className="breadcrumText">PROJECTS / {project.name}</p>
    </div>
  )
}
export default Breadcrum
