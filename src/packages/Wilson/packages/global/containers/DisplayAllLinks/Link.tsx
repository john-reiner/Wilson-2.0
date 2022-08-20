import React from 'react'
import { Avatar, Center } from '@mantine/core'
import StatusBadge from '../../StatusBadge'
import PriorityBadge from '../../PriorityBadge'
import UserAvatar from '../../UserAvatar'
import { Author } from './DisplayAllLinks'

interface LinkProps {
    title: string
    id: number
    author: Author
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

    return (
        <tr
            style={
                {
                    cursor: "pointer"
                }
            }
            onClick={() => linkClick(id)}
        >
            <td>{title}</td>
            {priority && 
                <td><PriorityBadge size={"sm"} priority={priority}/></td>
            }
            {status && 
                <td><StatusBadge size={"sm"} status={status}/></td>
            }
            <td>
                <UserAvatar
                    author={author}
                />
            </td>
            <td>{modified}</td>
        </tr>
    )
}
