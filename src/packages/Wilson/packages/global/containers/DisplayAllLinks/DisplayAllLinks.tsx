import React, { useEffect, useState } from 'react'

import { Table } from '@mantine/core'

import Link from './Link'
import InfoContainer from '../../InfoContainer'

interface PriorityColors {
    high: "red",
    medium: "yellow",
    low: "grey"
}

export type Author = {
    initials: string
    full_name: string
}

export interface DataObjectInterface {
    id: number
    title: string
    author: Author
    status?: string
    priority?: keyof PriorityColors
    modified?: string
}

interface DisplayAllLinksProps {
    displayItem: string
    data: any[]
    linkClick: (id: number) => void
    status?: boolean
    priority?: boolean,
    color?: string
}

export default function DisplayAllLinks({
    displayItem,
    data,
    linkClick,
    status,
    priority,
    color
}: DisplayAllLinksProps) {

    const [convertedData, setConvertedData] = useState<DataObjectInterface[]>([])

    useEffect(() => {
        convertDataToDataTypeObject()
    }, [data])

    const convertDataToDataTypeObject = () => {
        if (data.length > 0) {
            let returnedData = data.map(dataObject => {
                return {
                    id: dataObject.id,
                    title: dataObject.title,
                    author: dataObject.author,
                    modified: dataObject.modified,
                    status: dataObject.status,
                    priority: dataObject.priority
                }
            })
            setConvertedData(returnedData)
        }
    }

    const renderLinks = (
        convertedData: DataObjectInterface[]
        ) => {
        if (convertedData && convertedData.length > 0) {
            return convertedData.map((dataObject: DataObjectInterface) => {
                return (
                    <Link
                        key={displayItem+"_"+ dataObject.id}
                        id={dataObject.id}
                        title={dataObject.title}
                        author={dataObject.author}
                        status={dataObject.status}
                        modified={dataObject.modified}
                        linkClick={linkClick}
                        priority={dataObject.priority}
                    />
                )
            })
        }
    }


    return (
        <InfoContainer
            title={displayItem + "s"}
            color={color}
            totals={data.length}
            render={
                    <Table
                        striped
                        highlightOnHover
                    >
                        <thead>
                            <tr>
                                <th>Title</th>
                                {priority && 
                                    <th>Priority</th>       
                                }
                                {status && 
                                    <th>Status</th>
                                }
                                <th>Author</th>
                                <th>Modified</th>
                            </tr>
                        </thead>
                        <tbody>
                            {renderLinks(convertedData)}
                        </tbody>
                    </Table>
            }
        />
    )
}