import React, {useState} from 'react'
import { ProjectInterface } from '../../interfaces/projectInterfaces';

import { TextInput, Textarea, Button, Stack, Divider, Group, useMantineTheme, Paper, Text, Grid } from '@mantine/core';
import { BrandGithub, ColorSwatch } from 'tabler-icons-react';

interface ProjectFormProps {
    project: ProjectInterface
    setProject: React.Dispatch<React.SetStateAction<ProjectInterface>>
    handleChange: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => void
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
    setColor: (color: string, name: string) => void
    projectColor?: string
}

export default function ProjectForm({
    project,
    handleChange,
    handleSubmit,
    setColor,
    projectColor
}: ProjectFormProps) {

    const theme = useMantineTheme();

    const swatches = Object.keys(theme.colors).map((color) => (
        <ColorSwatch
            key={color} 
            color={theme.colors[color][6]}
            onClick={() => setColor(theme.colors[color][6], color)}
        />
    ));

    console.log(theme.colors)

    return (
        <form onSubmit={handleSubmit}>
            <Stack>
                <TextInput
                    placeholder="Example Project..."
                    label="Project Name"
                    required
                    name="title" 
                    value={project.title} 
                    onChange={handleChange}
                />
                <Textarea
                    placeholder="Description..."
                    label="Project Description"
                    name="description" 
                    value={project.description} 
                    onChange={handleChange}
                />
                <TextInput 
                    label="GitHub URL" 
                    placeholder="github" 
                    icon={<BrandGithub size={14} />} 
                    name="github_url"
                    value={project.github_url} 
                    onChange={handleChange}
                />
                <Paper
                    withBorder
                    p="lg"
                >
                    <Grid>
                        <Grid.Col
                            xs={3}
                        >
                            <Stack
                                align="center"
                            >
                                <Text size="sm">Project Color</Text>
                                <ColorSwatch
                                    color={projectColor}
                                />
                            </Stack>                            
                        </Grid.Col>
                        <Grid.Col
                            xs={9}
                        >
                            <Group 
                                position="center" 
                                spacing="xs"
                            >
                                {swatches}
                            </Group>
                        </Grid.Col>
                    </Grid>
                    <Divider 
                        orientation="vertical"
                        my={"xs"}
                    />

                </Paper>
                <Divider/>
                <Button
                    type="submit"
                    fullWidth
                    color="green"
                    variant="outline"
                >
                    Submit
                </Button>
            </Stack>
        </form>            
    )
}
