import React from 'react'
import { Badge, ThemeIcon } from '@mantine/core';
import { ThumbUp, PlayerPause, CircleCheck, Power, DotsCircleHorizontal } from 'tabler-icons-react';

export default function StatusBadge(props) {

    const icons = [
        [<Power size={10}/>, 'created', "yellow"],
        [<DotsCircleHorizontal size={10}/>, 'working', "blue"],
        [<ThumbUp size={10}/>, 'review', "orange"],
        [<CircleCheck size={10}/>, 'completed', "green"],
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
                    size="xs" 
                    color={color} 
                    radius="xl" 
                    variant="outline"
                >
                    {icon}
                </ThemeIcon>
            )
        }
    }

    return (
        <Badge
            sx={{ paddingLeft: 3 }}
            size="lg" 
            radius="lg"
            leftSection={renderIcon(props.status, icons)}
            color={returnColor(props.status, icons)}
        >
            {props.status}
        </Badge>
    )
}
