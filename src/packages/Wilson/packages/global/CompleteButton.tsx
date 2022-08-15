import React from 'react'

import { Button }  from '@mantine/core';
import { ListCheck, Activity } from 'tabler-icons-react';

interface CompleteButtonProps {
    status: string
    handleListComplete: () => void
}

export default function CompleteButton({
    status,
    handleListComplete
}: CompleteButtonProps) {

    const renderIcon = (
        status: string
    ) => {
        if (status === "ready") {
            return <ListCheck size={14} />
        } 
        return <Activity size={14} />
    }

    return (
        <Button 
            leftIcon={
                renderIcon(status)
            }
            variant="outline" 
            color={status === "ready" ? "green" : "blue"}
            onClick={handleListComplete}
            compact
        >
            {status === "ready" ? "Complete" : "Open"}
        </Button>
    )
}
