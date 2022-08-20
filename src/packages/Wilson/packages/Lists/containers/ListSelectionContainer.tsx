import React, {useState, useEffect} from 'react'

import DisplayAllLinks from '../../global/containers/DisplayAllLinks/DisplayAllLinks'

interface ListSelectionContainerProps {
    handleListSelection: (id: number) => void
    route: string
}

export default function ListSelectionContainer({
    handleListSelection,
    route
}: ListSelectionContainerProps) {

    const [lists, setLists] = useState([]);

    useEffect(() => {
        fetchLists()
    }, []);


    console.log(lists)

    const fetchLists = () => {
        
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

    return (
        <div>
            <DisplayAllLinks
                displayItem="list"
                data={lists}
                linkClick={handleListSelection}
                status={true}
            />
        </div>
    )
}
