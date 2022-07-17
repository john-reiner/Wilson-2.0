import React from 'react'
import { Grid, Paper, Text, Badge, Group } from '@mantine/core';

export default function StatusBadge(props) {
    return (
        <Badge
        >
            {props.status}
        </Badge>
    )
}
