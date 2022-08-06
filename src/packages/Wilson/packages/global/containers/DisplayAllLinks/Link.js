import React from 'react'
import { Avatar, Center } from '@mantine/core'
import StatusBadge from '../../StatusBadge'

export default function Link(props) {
    // title, creator, modified, optional status

    const renderPriorityTitle = (priority) => {
        if (priority) {
            const colors = {
                        high: "red",
                        medium: "yellow",
                        low: "grey"
                    }
            return (
                <Center
                    inline
                >
                    <Avatar 
                        color={colors[priority]}
                        size="sm" 
                        radius="xl"
                        style={{marginRight: "1em"}}
                    >{priority[0].toUpperCase()}</Avatar>
                    {" " + props.title}
                </Center>
            )
        }
        return props.title
    }

    return (
        <tr
            style={
                {
                    cursor: "pointer"
                }
            }
            onClick={() => props.linkClick(props.id)}
        >
            <td>
                {renderPriorityTitle(props.priority)}
            </td>
            {props.status && <td><StatusBadge size={"xs"} status={props.status}/></td>}
            <td>{props.author}</td>
            <td>{props.modified}</td>
        </tr>
    )
}
