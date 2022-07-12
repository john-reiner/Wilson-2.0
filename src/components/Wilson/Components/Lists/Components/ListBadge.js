import React from 'react'
import { Badge} from '@mantine/core';

export default function ListBadge(props) {

    const renderBadgeColor = status => {
        switch (status) {
            case "ready":
                return "orange"
            case "working":
                return "blue"
            default:
                return "red"
        }
    }

    return (
        <Badge color={renderBadgeColor(props.status)} radius="lg">{props.status}</Badge>
    )
}
