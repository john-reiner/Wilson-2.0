import React from 'react'
import { Button }  from '@mantine/core';
import { ListCheck, Activity } from 'tabler-icons-react';

export default function CompleteButton(props) {

    const renderIcon = (status) => {
        if (status === "ready") {
            return <ListCheck size={14} />
        } 
        return <Activity size={14} />
    }

    return (
        <Button 
            leftIcon={
                renderIcon(props.status)
            }
            variant="outline" 
            color={props.status === "ready" && "green"}
            onClick={props.handleListComplete}
        >
            {props.status === "ready" ? "Complete" : "Open"}
        </Button>
    )
}
