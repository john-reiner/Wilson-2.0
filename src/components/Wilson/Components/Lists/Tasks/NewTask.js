import React from 'react'
import { ActionIcon, TextInput} from '@mantine/core';
import { ArrowBarDown } from 'tabler-icons-react';

export default function NewTask(props) {
    return (
        <form onSubmit={props.handleSubmit}>
            <TextInput
                placeholder="List Item..."
                radius="xs"
                required
                name="content"
                value={props.listTask.content}
                onChange={props.handleChange}
                rightSection={
                    <ActionIcon type="submit" color={"green"}>
                        <ArrowBarDown />
                    </ActionIcon>
                }
                style={{ marginBottom: 10 }}
            />
        </form>
    )
}
