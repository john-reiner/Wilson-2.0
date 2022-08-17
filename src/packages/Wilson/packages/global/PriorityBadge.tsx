import React from 'react'

import { Badge, MantineSize } from '@mantine/core';

interface PriorityBadgeProps {
    priority: "low" | "medium" | "high",
    size?: MantineSize
}

export default function PriorityBadge({
    priority,
    size
}:PriorityBadgeProps) {


    const returnColor = (
        priority: "low" | "medium" | "high"
    ) => {
        if (priority === "low") return "blue"
        if (priority === "medium") return "yellow"
        return "red"
    }

    return (
        <Badge
            size={size} 
            radius="xl"
            variant="filled"
            color={returnColor(priority)}
        >
            {priority}
        </Badge>
    )
}