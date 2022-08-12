import React, {useState, useEffect} from 'react'

import DisplayAllLinks from '../../global/containers/DisplayAllLinks'

interface ListSelectionContainerProps {
    handleListSelection: (id: number) => void
    listable: "projects" | "features"
    projectId: number
    featureId: number | undefined
    newButtonClick: () => void
}

export default function ListSelectionContainer({
    newButtonClick,
    handleListSelection,
    listable,
    projectId,
    featureId
}: ListSelectionContainerProps) {

    const groups = {
        status: ["pending", "working", "ready", "completed"]
    }

    const [lists, setLists] = useState([]);
    const [counts, setCounts] = useState({})
    const [searchValues, setSearchValues] = useState([]);

    useEffect(() => {
        searchLists(searchValues)
    }, [searchValues])
    

    const handleChangedSearchValues = (value: []) => {
        setSearchValues(value)
    }

    useEffect(() => {
        fetchLists()
    }, []);

    const fetchLists = () => {
        let route = `http://localhost:3001/api/v2/projects/${projectId}/lists/`
        if (listable === "features") {
            route = `http://localhost:3001/api/v2/projects/${projectId}/features/${featureId}/lists`
        }
        fetch(route, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "bearer " + localStorage.getItem('wilsonUserToken')
                },
            }
        )
        .then(response => response.json())
        .then(payload => {
            setLists(payload.lists)
            setCounts(payload.counts)
        })
        .catch(errors => {
            console.error(errors)
        })
    }

    const searchLists = (values: never[]) => {
        if (values) {
            let valuesString = values.join()
            let route = `http://localhost:3001/api/v2/projects/${projectId}/lists-search?status=${valuesString}`
            if (listable === "features") {
                route = `http://localhost:3001/api/v2/projects/${projectId}/features/${featureId}/lists-search?status=${valuesString}`
            }
            fetch(route, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "bearer " + localStorage.getItem('wilsonUserToken')
                },
            }
            )
            .then(response => response.json())
            .then(payload => {
                setLists(payload)
            })
            .catch(errors => {
                console.error(errors)
            })
        }
    }

    return (
        <div>
            <DisplayAllLinks
                displayItem="list"
                groups={groups}
                counts={counts}
                data={lists}
                linkClick={handleListSelection}
                status={true}
                handleChange={handleChangedSearchValues}
                newButtonClick={newButtonClick}
            />
        </div>
    )
}
