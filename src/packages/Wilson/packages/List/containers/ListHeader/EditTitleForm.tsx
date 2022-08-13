import React from 'react'

import { ActionIcon, TextInput}  from '@mantine/core';
import { ArrowBarRight } from 'tabler-icons-react';
import { ListType } from '../../listTypes';

interface EditTitleFormProps {
    title: string
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    updateList: (list: ListType) => void

}

export default function EditTitleForm({
    title,
    handleChange,
    updateList
}: EditTitleFormProps) {

    const handleSubmit = (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault()
        // updateList({title: title })
    }

    return (
        <form
            style={{ width: "90%" }}
            onSubmit={(e) => handleSubmit(e)}
        >
            <TextInput
                // placeholder={title}
                radius="xs"
                required
                name="title"
                value={title}
                onChange={handleChange}
                rightSection={
                    <ActionIcon type="submit" color={"green"}>
                        <ArrowBarRight />
                    </ActionIcon>
                }
            />                    
        </form>
    )
}
