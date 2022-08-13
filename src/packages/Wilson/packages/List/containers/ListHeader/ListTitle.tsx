import React from 'react'
import { Title, Text }  from '@mantine/core';
import EditTitleForm from './EditTitleForm'
import { ListType } from '../../listTypes';

interface ListTitleProps {
    edit: boolean
    title: string
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    updateList: (list: ListType) => void
}

export default function ListTitle({
    edit,
    title,
    handleChange,
    updateList
}: ListTitleProps) {

    const renderTitle = (edit: boolean) => {
        if (edit) {
            return (
                <EditTitleForm
                    title={title}
                    handleChange={handleChange}
                    updateList={updateList}
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
