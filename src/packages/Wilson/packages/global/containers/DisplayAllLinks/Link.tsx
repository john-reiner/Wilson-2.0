import React from 'react'
import { Avatar, Center } from '@mantine/core'
import StatusBadge from '../../StatusBadge'

interface LinkProps {
    title: string
    id: number
    author: string
    status?: string
    priority?: keyof PriorityColors
    modified: string
    linkClick: (id: number) => void
}

interface PriorityColors {
    high: "red",
    medium: "yellow",
    low: "grey"
}

export default function Link({
    title,
    id,
    author,
    status,
    priority,
    modified,
    linkClick
}: LinkProps) {
    // title, creator, modified, optional status

    const priorityColors: PriorityColors = {
        high: "red",
        medium: "yellow",
        low: "grey"
    }

    const renderPriorityTitle = (
        priority: keyof PriorityColors | undefined,
        priorityColors: PriorityColors
    ) => {
        if (priority) {
            return (
                <Center
                    inline
                >
                    <Avatar 
                        color={priorityColors[priority]}
                        size="sm" 
                        radius="xl"
                        style={{marginRight: "1em"}}
                    >{priority[0].toUpperCase()}</Avatar>
                    {" " + title}
                </Center>
            )
        }
        return title
    }

    return (
        <tr
            style={
                {
                    cursor: "pointer"
                }
            }
            onClick={() => linkClick(id)}
        >
            <td>
                {renderPriorityTitle(priority, priorityColors)}
            </td>
            {status && <td><StatusBadge size={"xs"} status={status}/></td>}
            <td>{author}</td>
            <td>{modified}</td>
        </tr>
    )
}
