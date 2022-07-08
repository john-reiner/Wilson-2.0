import React from 'react'

import { 
    ActionIcon, 
    Menu, 
    Grid, 
    Title, 
    Divider, 
    Center,
    Anchor,
    Box,
    Group,
} from '@mantine/core';
import { Settings, Edit, Trash, BrandGithub } from 'tabler-icons-react';

import { useDisclosure } from '@mantine/hooks';

export default function MainContainerHeader(props) {

    const [opened, handlers] = useDisclosure(false);

    return (
            <Grid align="center">
                <Grid.Col span={11}>
                    <Title 
                        order={2}
                        className="wilson-logo-small"
                    >
                        {props.project.title}
                    </Title>
                </Grid.Col>

                <Grid.Col 
                    span={1}
                    align="right"
                >
                    <Menu
                        opened={opened} 
                        onOpen={handlers.open} 
                        onClose={handlers.close}
                        control={<ActionIcon variant="hover" color="blue"><Settings size={16} /></ActionIcon>}
                    >
                        <Menu.Item
                            icon={<Edit size={14} />}
                            onClick={() => props.setEditModalOpen(true)}
                        >
                            Edit
                        </Menu.Item>
                        <Divider />
                        <Menu.Item
                            color="red" 
                            icon={<Trash size={14} />}
                            onClick={() => props.setDeleteConfirmationModalOpen(true)}
                        >
                            Delete Project
                        </Menu.Item>
                    </Menu>
                </Grid.Col>
                <Grid.Col 
                    span={9}
                >
                    <Group spacing="xs">
                        {props.renderTabs(props.projectShowTabs)}
                    </Group>
                </Grid.Col>
                <Grid.Col 
                    span={3}
                    align="right"
                >
                    <Anchor href={props.project.github_url} target="_blank">
                        <Center inline>
                            <ActionIcon 
                                variant="hover" 
                                >
                                <BrandGithub size={16} />
                            </ActionIcon>
                            <Box ml={5}>{props.project.public ? "Public" : "Private"}</Box>
                        </Center>
                    </Anchor>
                </Grid.Col>
            </Grid>
    )
}
