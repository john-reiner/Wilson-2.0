import React from 'react'

import CompleteButton from '../../global/CompleteButton';
import StatusBadge from '../../global/StatusBadge';

interface StatusContainerProps {
    status: string
}

export default function StatusContainer({
    status
}: StatusContainerProps) {

    const renderContent = (status: string) => {
        if (status === "ready" || status === "completed") {
            return (
                <CompleteButton
                    // handleListComplete={props.handleListComplete}
                    status={status}
                />
            )
        }
        return (
            <StatusBadge
                status={status}
            />
        )
    }

    return (
        <div>{renderContent(status)}</div>
    )
}
