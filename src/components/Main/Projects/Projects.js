import React, {useState, useEffect} from 'react'
import './Projects.css'
import ProjectLink from './ProjectLink/ProjectLink';

export default function Projects(props) {

    const [projects, setProjects] = useState([]);

    useEffect(() => {
        fetchProjects()
    }, []);

    const fetchProjects = () => {
        fetch(`http://localhost:3001/api/v2/users/${props.userId}/projects`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "bearer " + localStorage.getItem('wilsonUserToken')
            }, 
            
            })
        .then(response => response.json())
        .then(payload => {
            if (payload.status === "ok") {
                setProjects(payload)
            } else {
                console.error("Something went wrong")
            }
        })
        .catch(errors => console.error("Something went wrong...", errors))
    }

    const renderProjects = () => {
        if (projects.projects) {
            return projects.projects.map(project => {
                return <ProjectLink 
                            id={project.id} 
                            key={project.id} 
                            title={project.title}
                            setViewToShow={props.setViewToShow}
                            handleProjectShow={props.handleProjectShow}
                            author={project.author_first + " " + project.author_last}
                            modified={project.modified}
                            created={project.created}
                        />
            })
        } else {
            return (
                <p>No Projects</p>
            )
        }
    }

    return (
        <div id="projects-container">
            <div id="projects-show-heading">
                <h2>Projects</h2>
                <div id="new-project-button" onClick={() => props.setViewToShow(2)}>New Project</div>
            </div>
            <div id="all-projects-container">
                <div id="all-projects-header">
                    <h3>All Projects</h3>
                    <span><b>{projects.projects_total}</b> total</span>
                </div>
                <table id="links">
                    <tr id="links-heading">
                        <th className="link-title-head"><b>Title</b></th>
                        
                        <th><b>Author</b></th>
                        <th><b>Modified</b></th>
                        <th><b>Created</b></th>
                    </tr>
                    {renderProjects()}
                </table>

            </div>
        </div>
    )
}