import React from 'react'



import ListBadge from './ListBadge';
import CompleteButton from './CompleteButton';

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
            <ListBadge
                status={status}
            />
        )
    }

    return (
        <div>{renderContent(props.status)}</div>
    )
}
