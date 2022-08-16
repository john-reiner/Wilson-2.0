import React from 'react'
import { Title, Text }  from '@mantine/core';
import EditTitleForm from './EditTitleForm'

interface ListTitleProps {
    edit: boolean
    title: string
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    id: string | number
    route: string
    setFetchList: React.Dispatch<React.SetStateAction<boolean>>
    setEdit: React.Dispatch<React.SetStateAction<boolean>>
}

export default function ListTitle({
    edit,
    title,
    handleChange,
    id,
    route,
    setFetchList,
    setEdit
}: ListTitleProps) {

    const renderTitle = (edit: boolean) => {
        if (edit) {
            return (
                <EditTitleForm
                    title={title}
                    id={id}
                    route={route}
                    setFetchList={setFetchList}
                    setEdit={setEdit}
                />
            )
        }
        return (
            <Text lineClamp={1}>
                {title}
            </Text>
        )
    }

    return (
        <Title order={4}>
            {renderTitle(edit)}
        </Title>
    )
}
