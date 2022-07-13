import React from 'react'



import ListBadge from '../../Components/ListBadge';
import CompleteButton from '../../Components/CompleteButton';

export default function StatusContainer(props) {

    const renderContent = (status) => {
        if (status === "ready" || status === "completed") {
            return (
                <CompleteButton
                    handleListComplete={props.handleListComplete}
                    status={props.status}
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
