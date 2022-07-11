import { Card, Image, Text, Title, Divider } from '@mantine/core';

import React from 'react'

export default function DescriptionCard(props) {

    return (
        <Card shadow="sm" p="sm">
            <Card.Section>
            <Image src="https://images.unsplash.com/photo-1620325867502-221cfb5faa5f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1457&q=80" 
                height={160} 
                alt="Project Management" />
            </Card.Section>
            <Title>{props.title} </Title>
            <Divider my="xs"/>
            <Text>{props.description}</Text>
        </Card>
    )
}
