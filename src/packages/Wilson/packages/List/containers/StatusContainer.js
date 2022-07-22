import React from 'react'



import ListBadge from '../../global/ListBadge';
import CompleteButton from '../../global/CompleteButton';

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
