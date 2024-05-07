import React, { useContext } from 'react'
import {ShopContext} from '../../Context/ShopContext'
import { useParams } from 'react-router-dom';
import  Breadcrum  from '../../Components/Breadcrums/breadcrums';
import{Navbar} from'../../Components/Navbar/navbar'
import  ProjectDisplay  from '../../Components/ProjectDisplay/ProjectDisplay';
import"./projects.css"
export const ProjectDetails = () => {
    const {Projects}= useContext(ShopContext);
    const {projectId} = useParams();
    const project = Projects.find((e)=> e.id === Number(projectId));
  return (
    <div className="">
      <Navbar className="navbar" />
        <Breadcrum className="breadcrum" project= {project} />
        <ProjectDisplay className="projectDisplay" project= {project} />
    </div>
  )
}
