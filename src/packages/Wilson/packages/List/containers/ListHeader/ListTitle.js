import React from 'react'
import { Title, Text }  from '@mantine/core';
import EditTitleForm from './EditTitleForm'

export default function ListTitle(props) {

    const renderTitle = edit => {
        if (edit) {
            return (
                <EditTitleForm
                    title={props.title}
                    handleChange={props.handleChange}
                    updateList={props.updateList}
                />
            )
        }
        return (
            <Text lineClamp={1}>
                {props.title}
            </Text>
        )
    }

    return (
        <Title order={4}>
            {renderTitle(props.edit)}
        </Title>
    )
}
