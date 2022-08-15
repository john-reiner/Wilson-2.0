import React from 'react'

import CompleteButton from '../../global/CompleteButton';
import StatusBadge from '../../global/StatusBadge';

interface StatusContainerProps {
    status: string | undefined
    route: string
    handleSuccess: () => void
}

export default function StatusContainer({
    status,
    route,
    handleSuccess
}: StatusContainerProps) {

    const updateListStatus = (
        status: string,
        route: string
        ) => {
        fetch( route, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "bearer " + localStorage.getItem('wilsonUserToken')
                },
                body: JSON.stringify({list: {status}})
                })
        .then(response => response.json())
        .then(payload => {
            handleSuccess()
        })
        .catch(errors => {
            console.error(errors)
        })
    }

    const handleListComplete = () => {
        if (status === "ready") {
            updateListStatus("completed", route)
        } else {
            updateListStatus("ready", route)
        }
    }

    const renderContent = (status: string | undefined) => {
        if (status === "ready" || status === "completed") {
            return (
                <CompleteButton
                    handleListComplete={handleListComplete}
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
