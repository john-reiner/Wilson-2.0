import React from 'react'

import { Badge, ThemeIcon } from '@mantine/core';
import { Dots, ThumbUp, PlayerPause, CircleCheck, Power, DotsCircleHorizontal } from 'tabler-icons-react';

export default function StatusBadge(props) {

    const icons = [
        [<Power size={10}/>, 'created', "yellow"],
        [<Dots size={10}/>, 'pending', "gray"],
        [<DotsCircleHorizontal size={10}/>, 'working', "orange"],
        [<ThumbUp size={10}/>, 'ready', "green"],
        [<CircleCheck size={10}/>, 'completed', "blue"],
        [<PlayerPause size={10}/>, 'paused', "gray"]
    ]

    const returnColor = (status, icons) => {
        if (status) {
            return icons.find(icon => status === icon[1])[2]
        }
    }

    const renderIcon = (status, icons) => {
        if (status) {
            let icon = icons.find(icon => status === icon[1])[0]
            let color = icons.find(icon => status === icon[1])[2]
            return (
                <ThemeIcon
                    size="sm" 
                    color={color} 
                >
                    {icon}
                </ThemeIcon>
            )
        }
    }

    return (
        <Badge
            sx={{ paddingLeft: 3 }}
            size={props.size} 
            radius="sm"
            leftSection={props.size === "xl" && renderIcon(props.status, icons)}
            color={returnColor(props.status, icons)}
        >
            {props.status}
        </Badge>
    )
}
