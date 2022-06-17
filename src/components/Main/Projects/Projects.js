import React, {useState, useEffect} from 'react'
import './Projects.css'
import MainProject from './ProjectLink/ProjectLink';

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
                setProjects(payload.projects)
            } else {
                console.error("Something went wrong")
            }
        })
        .catch(errors => console.error("Something went wrong...", errors))
    }

    const renderProjects = () => {
        if (projects.length > 0) {
            return projects.map(project => {
                return <MainProject 
                            id={project.id} 
                            key={project.id} 
                            title={project.title}
                            description={project.description}
                            github_url={project.github_url}
                            public={project.public}
                            setViewToShow={props.setViewToShow}
                            handleProjectShow={props.handleProjectShow}
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
                <h4>Projects</h4>
                <div id="new-project-button" onClick={() => props.setViewToShow(2)}>New Project</div>
            </div>
            <hr></hr>
            {renderProjects()}
        </div>
    )
}