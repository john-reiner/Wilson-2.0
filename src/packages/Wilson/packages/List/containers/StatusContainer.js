import React from 'react'

import CompleteButton from '../../global/CompleteButton';
import StatusBadge from '../../global/StatusBadge';

export default function StatusContainer(props) {

    const renderContent = (status) => {
        if (status === "ready" || status === "completed") {
            return (
                <CompleteButton
                    handleListComplete={props.handleListComplete}
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
        <div>{renderContent(props.status)}</div>
    )
}
