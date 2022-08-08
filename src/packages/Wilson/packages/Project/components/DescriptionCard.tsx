import React from 'react'
import { Card, Image, Text, Title, Divider } from '@mantine/core';

interface DescriptionCardProps {
    title: string
    image: string | undefined
    description: string | undefined
}

export default function DescriptionCard({
    title,
    image,
    description
}: DescriptionCardProps) {

    return (
        <Card shadow="sm" p="sm">
            <Card.Section>
            <Image src={image || "https://redzonekickboxing.com/wp-content/uploads/2017/04/default-image.jpg"} 
                height={160} 
                alt="Project Management" />
            </Card.Section>
            <Title>{title} </Title>
            <Divider my="xs"/>
            <Text>{description}</Text>
        </Card>
    )
}
