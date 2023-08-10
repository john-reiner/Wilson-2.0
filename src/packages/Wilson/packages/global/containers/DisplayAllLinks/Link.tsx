import React from 'react'
import StatusBadge from '../../StatusBadge'
import PriorityBadge from '../../PriorityBadge'
import UserAvatar from '../../UserAvatar'
import { Author } from './DisplayAllLinks'
import { convertDate } from '../../helpers/convertDate'

interface LinkProps {
    title: string
    id: number
    author: Author
    status?: string
    priority?: keyof PriorityColors
    modified?: string
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
            <td>{convertDate(modified)}</td>
        </tr>
    )
}
