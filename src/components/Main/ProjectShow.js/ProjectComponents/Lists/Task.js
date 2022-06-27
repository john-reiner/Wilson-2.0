import React from 'react'
import { List, ThemeIcon } from '@mantine/core';
import { CircleCheck, CircleDashed } from 'tabler-icons-react';

export default function Task(props) {
    return (
        <List.Item
            icon={
                <ThemeIcon color={props.completed ? "green" : "blue"} size={24} radius="xl">{ props.completed ? <CircleCheck size={16} /> : <CircleDashed/>}</ThemeIcon>
            }>
            {props.content}
        </List.Item>
    )
}
