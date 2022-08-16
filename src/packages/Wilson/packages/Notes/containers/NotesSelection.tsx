import React, {useState, useEffect} from 'react'

import DisplayAllLinks, { DataObjectInterface } from '../../global/containers/DisplayAllLinks'
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
    const [data, setData] = useState<DataObjectInterface[]>([])

    useEffect(() => {
        convertDataToDataTypeObject()
    }, [notes])
    
    const convertDataToDataTypeObject = () => {
        if (notes.length > 0) {
            let returnedData = notes.map(note => {
                return {
                    id: note.id,
                    title: note.title,
                    author: note.author,
                    modified: note.modified
                }
            })
            setData(returnedData)
        }
    }

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
