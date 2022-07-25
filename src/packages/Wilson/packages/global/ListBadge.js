import React from 'react'

import { Badge} from '@mantine/core';

export default function ListBadge(props) {

    const renderBadgeColor = status => {
        if (status === "pending") {
            return "gray"
        } else {
            return "blue"
        }
    }

    return (
        <Badge color={renderBadgeColor(props.status)} radius="lg">{props.status}</Badge>
    )
}
