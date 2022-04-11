import React, {useState, useEffect} from 'react'

export default function ProjectShow(props) {

    const [project, setProject] = useState({});

    useEffect(() => {
        fetchProject()
    }, []);

    const fetchProject = () => {
        fetch(`http://localhost:3001/api/v2/users/${props.userId}/projects/${props.projectId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "bearer " + localStorage.getItem('wilsonUserToken')
            }
            })
        .then(response => response.json())
        .then(payload => {
            if (payload.status === "ok") {
                setProject(payload.project)
            } else {
                console.error("Something went wrong")
            }
        })
        .catch(errors => console.error("Something went wrong...", errors))
    }

    console.log(project)

    return (
        <div>ProjectShow</div>
    )
}
