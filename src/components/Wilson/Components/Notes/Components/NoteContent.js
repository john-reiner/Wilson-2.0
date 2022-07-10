import React from 'react'
import { Text } from '@mantine/core';


export default function NoteBody(props) {


    return (
            <Text>{props.content}</Text>
    )
}