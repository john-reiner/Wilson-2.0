import React from 'react'
import { Card, Image, Text, Badge, Button, Group, useMantineTheme, Grid } from '@mantine/core';


export default function ProjectLink(props) {

    const theme = useMantineTheme();

    const secondaryColor = theme.colorScheme === 'dark'
        ? theme.colors.dark[1]
        : theme.colors.gray[7];

    return (
        <Grid.Col sm={6} md={6} lg={3}>
            <Card shadow="sm" p="lg">
                <Card.Section>
                    <Image src={"https://images.unsplash.com/photo-1624333460019-b06834b4c805?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80"} height={160} alt="Norway" />
                </Card.Section>
                <Group position="apart" style={{ marginBottom: 5, marginTop: theme.spacing.sm }}>
                <Text weight={500}>{props.project.title}</Text>
                <Badge color={props.project.public ? "green" : "pink"} variant="light">
                    {props.project.public ? "Public" : "Private"}
                </Badge>
                </Group>
                <Text size="sm" style={{ color: secondaryColor, lineHeight: 1.5 }}>
                    {props.project.description}
                </Text>
                <Button 
                    variant="light" color="blue" 
                    fullWidth 
                    style={{ marginTop: 14 }}
                    onClick={() => props.handleProjectShow(props.project.id)} 
                >
                    View Project
                </Button>
            </Card>
        </Grid.Col>
        )
    }