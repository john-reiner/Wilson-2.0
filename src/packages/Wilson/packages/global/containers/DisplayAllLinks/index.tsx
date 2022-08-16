import React from 'react'

import { Paper, Title, Text, Divider, Table } from '@mantine/core'

import Link from './Link'

interface PriorityColors {
    high: "red",
    medium: "yellow",
    low: "grey"
}

export interface DataObjectInterface {
    id: number
    title: string
    author: string
    status?: string
    priority?: keyof PriorityColors
    modified?: string
}

interface DisplayAllLinksProps {
    displayItem: string
    groups: {}
    counts: {}
    data: DataObjectInterface[]
    linkClick: (id: number) => void
    status?: boolean
}


export default function DisplayAllLinks({
    displayItem,
    data,
    linkClick,
    status,
}: DisplayAllLinksProps) {

    const pluralizeDisplayItem = (
        displayItem: string, 
        count: number
        ) => {
        if (count && (count > 1 || count === 0)) {
            return displayItem + 's'
        }
        return displayItem
    }

    const renderLinks = (
        data: DataObjectInterface[]
        ) => {
        if (data && data.length > 0) {
            return data.map((dataObject: DataObjectInterface) => {
                return (
                    <Link
                        key={displayItem+"_"+ dataObject.id}
                        id={dataObject.id}
                        title={dataObject.title}
                        author={dataObject.author}
                        status={dataObject.status}
                        modified="1/1/2000"
                        linkClick={linkClick}
                        priority={dataObject.priority}
                    />
                )
            })
        }
    }



    return (
        <Paper
            shadow="xs" 
            withBorder
        >
            <Paper
                p="lg"
            >
                <Title 
                    order={3}
                >
                    All {displayItem + "s"}
                </Title>
                <Text>{data.length + " " + pluralizeDisplayItem(displayItem, data.length)}</Text>
            </Paper>
            <Divider/>
            <Table
                striped
                highlightOnHover
            >
                <thead>
                    <tr>
                        <th>Title</th>
                        {status && <th>Status</th>}
                        <th>Creator</th>
                        <th>Modified</th>
                    </tr>
                </thead>
                <tbody>
                    {renderLinks(data)}
                </tbody>
            </Table>
        </Paper>
    )
}