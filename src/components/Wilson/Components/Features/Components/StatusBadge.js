import React from 'react'
import { Badge } from '@mantine/core';

export default function StatusBadge(props) {
    return (
        <Badge
        >
            {props.status}
        </Badge>
    )
}
