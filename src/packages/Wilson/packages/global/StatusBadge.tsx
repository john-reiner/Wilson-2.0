import React from 'react'

import { Badge, ThemeIcon } from '@mantine/core';
import { Dots, ThumbUp, PlayerPause, CircleCheck, Power, DotsCircleHorizontal } from 'tabler-icons-react';

interface StatusBadgeProps {
    size: string | undefined
    status: string
}

export default function StatusBadge({
    size,
    status
}: StatusBadgeProps) {

    const icons = [
        [<Power size={10}/>, 'created', "yellow"],
        [<Dots size={10}/>, 'pending', "gray"],
        [<DotsCircleHorizontal size={10}/>, 'working', "orange"],
        [<ThumbUp size={10}/>, 'ready', "green"],
        [<CircleCheck size={10}/>, 'completed', "blue"],
        [<PlayerPause size={10}/>, 'paused', "gray"]
    ]

    // const returnColor = (

    //     ) => {
    //     if (status) {
    //         if (icons) {
    //             return icons.find(icon => status === icon[1])[2]
    //         }
    //     }
    // }

    // const renderIcon = (
    // ) => {
    //     if (status) {
    //         let icon = icons.find(icon => status === icon[1])[0]
    //         let color = icons.find(icon => status === icon[1])[2]
    //         return (
    //             <ThemeIcon
    //                 size="sm" 
    //                 color={color} 
    //             >
    //                 {icon}
    //             </ThemeIcon>
    //         )
    //     }
    // }

    return (
        <Badge
            // size={size} 
            radius="sm"
            // leftSection={size === "xl" && renderIcon(status, icons)}
            // color={returnColor(status, icons)}
        >
            {status}
        </Badge>
    )
}
