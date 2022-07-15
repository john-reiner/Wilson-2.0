import React from 'react'
import { ActionIcon, TextInput}  from '@mantine/core';
import { ArrowBarRight } from 'tabler-icons-react';

export default function EditTitleForm(props) {

    const handleSubmit = e => {
        e.preventDefault()
        props.updateList({title: props.title })
    }

    

    return (
        <form
            style={{ width: "90%" }}
            onSubmit={handleSubmit}
        >
            <TextInput
                // placeholder={props.title}
                radius="xs"
                required
                name="title"
                value={props.title}
                onChange={props.handleChange}
                rightSection={
                    <ActionIcon type="submit" color={"green"}>
                        <ArrowBarRight />
                    </ActionIcon>
                }
            />                    
        </form>
    )
}
