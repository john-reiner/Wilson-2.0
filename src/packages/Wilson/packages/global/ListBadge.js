import React from 'react'

import { Badge} from '@mantine/core';

export default function ListBadge(props) {

    const renderBadgeColor = status => {

        switch (status) {
            case "pending":
                return "gray"
                break;
            case "working":
                return "orange"
                break;
            case "ready":
                return "green"
                break;
            case "completed":
                return "blue"
                break;
            default:
                break;
        }
        // if (status === "pending") {
        //     return "gray"
        // } else {
        //     return "blue"
        // }
    }

    return (
        <Badge color={renderBadgeColor(props.status)} radius="xs" variant="outline">{props.status}</Badge>
    )
}
