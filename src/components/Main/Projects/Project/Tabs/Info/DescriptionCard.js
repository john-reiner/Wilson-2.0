import { Card, Image, Text, Textarea, Button, Group, useMantineTheme, Stack } from '@mantine/core';

import React, {useState} from 'react'
import { propTypes } from 'react-bootstrap/esm/Image';

export default function DescriptionCard(props) {

    const [project, setProject] = useState({
        title: props.title,
        description: props.description
    });

    const handleChange = e => setProject({...project, [e.target.name]:e.target.value})
    const togglePublic = e => {
        setProject({...project, [e.target.name]:e.target.checked})
    }

    const handleSubmit = e => {
        e.preventDefault()
        fetch(`http://localhost:3001/api/v2/users/${props.userId}/projects`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "bearer " + localStorage.getItem('wilsonUserToken')
                },
                body: JSON.stringify({project: project})
                })
        .then(response => response.json())
        .then(payload => {
            if (payload.status === "ok") {
                props.handleProjectShow(payload.message.id)
            }
        })
        .catch(errors => {
            console.error(errors)
        })
    }    
    
    const theme = useMantineTheme();

    const secondaryColor = theme.colorScheme === 'dark'
        ? theme.colors.dark[1]
        : theme.colors.gray[7];

    const renderContent = (edit) => {
        if (edit) {
            return (
                <form onSubmit={handleSubmit}>
                <Stack>
                    <Textarea
                        autosize
                        name="description" 
                        value={props.description} 
                        onChange={handleChange}
                    />      
                    <Button
                        type="submit"
                        variant="outline"
                    >
                        Submit
                    </Button>              
                </Stack>
                </form>

            )
        }

        return (
            <Text size="sm" style={{ color: secondaryColor, lineHeight: 1.5 }}>{props.description}</Text>
        )
    }

    return (
        <Card shadow="sm" p="lg">
            <Card.Section>
            <Image src="https://images.unsplash.com/photo-1620325867502-221cfb5faa5f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1457&q=80" 
                height={160} 
                alt="Project Management" />
            </Card.Section>

            <Group position="apart" style={{ marginBottom: 5, marginTop: theme.spacing.sm }}>
            <Text weight={500}>Project: {props.title} </Text>
            </Group>
            {/* {renderForm()} */}
            {renderContent(props.edit)}
        </Card>
    )
}
