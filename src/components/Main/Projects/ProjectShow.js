import React, {useState, useEffect} from 'react'
import useFetch from '../../../hooks/useFetch';


export default function ProjectShow(props) {

    const [project, setProject] = useState({});

    const [{response, errors, loading}, goFetch] = useFetch("")

    useEffect(() => {
        if (props.id) {
            goFetch(`http://localhost:3001/api/v2/users/${props.userId}/projects/${props.id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "bearer " + localStorage.getItem('wilsonUserToken')
                }
            })
            }
    }, [props.id, props.userId]);



    // const fetchProject = () => {
    //     fetch(`http://localhost:3001/api/v2/users/${props.userId}/projects/${props.id}`, {
    //         method: 'GET',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Authorization': "bearer " + localStorage.getItem('wilsonUserToken')
    //         }
    //         })
    //     .then(response => response.json())
    //     .then(payload => {
    //         if (payload.status === "ok") {
    //             setProject(payload.project)
    //         } else {
    //             console.error("Something went wrong")
    //         }
    //     })
    //     .catch(errors => console.error("Something went wrong...", errors))
    // }

    console.log({response, errors, loading})

    return (
        <div>
            {loading && "loading..."}
        </div>
    )
}
