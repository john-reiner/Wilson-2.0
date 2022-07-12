import { Card, Image, Text, Title, Divider } from '@mantine/core';

import React from 'react'

export default function DescriptionCard(props) {

    return (
        <Card shadow="sm" p="sm">
            <Card.Section>
            <Image src={props.image || "https://redzonekickboxing.com/wp-content/uploads/2017/04/default-image.jpg"} 
                height={160} 
                alt="Project Management" />
            </Card.Section>
            <Title>{props.title} </Title>
            <Divider my="xs"/>
            <Text>{props.description}</Text>
        </Card>
    )
}
