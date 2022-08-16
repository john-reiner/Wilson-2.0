import React, {useState, useEffect} from 'react'

import DisplayAllLinks from '../../global/containers/DisplayAllLinks'
import { NoteType } from '../noteTypes'

interface ListSelectionContainerProps {
    linkClick: (id: number) => void
    notes: NoteType[]
}

export default function NotesSelection({
    notes,
    linkClick
    // handleListSelection,
    // listable,
    // projectId,
    // featureId
}: ListSelectionContainerProps) {

    const groups = {
        status: ["pending", "working", "ready", "completed"]
    }
    const [data, setData] = useState([])

    useEffect(() => {
        convertDataToDataTypeObject()
    }, [notes])
    
    const convertDataToDataTypeObject = () => {
        if (notes.length > 0) {
            let returnedData = notes.map(note => {
                console.log(note)
            })
        }
    }

    // const handleChangedSearchValues = (value: []) => {
    //     setSearchValues(value)
    // }


    // const searchLists = (values: never[]) => {
    //     if (values) {
    //         let valuesString = values.join()
    //         let route = `http://localhost:3001/api/v2/projects/${projectId}/lists-search?status=${valuesString}`
    //         if (listable === "features") {
    //             route = `http://localhost:3001/api/v2/projects/${projectId}/features/${featureId}/lists-search?status=${valuesString}`
    //         }
    //         fetch(route, {
    //             method: 'GET',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'Authorization': "bearer " + localStorage.getItem('wilsonUserToken')
    //             },
    //         }
    //         )
    //         .then(response => response.json())
    //         .then(payload => {
    //             setLists(payload)
    //         })
    //         .catch(errors => {
    //             console.error(errors)
    //         })
    //     }
    // }

    return (
        <div>
            <DisplayAllLinks
                displayItem={"note"}
                groups={groups}
                counts={data.length}
                data={data}
                linkClick={linkClick}
                status={false}
            />
        </div>
    )
}
