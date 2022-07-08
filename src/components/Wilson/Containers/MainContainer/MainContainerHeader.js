import React, {useState} from 'react'
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
    Text
} from '@mantine/core';
import { Settings, Edit, Trash, BrandGithub } from 'tabler-icons-react';
import { useDisclosure } from '@mantine/hooks';

import Tab from './Tab';

export default function MainContainerHeader(props) {

    const [opened, handlers] = useDisclosure(false);
    const [activeTabIndex, setActiveTabIndex] = useState(0);

    const renderTabs = (tabsArray) => {
        let keyNum = -1
        return tabsArray.map(tab => {
            keyNum ++
            return <Tab 
                        name={tab}
                        activeTabIndex={activeTabIndex}
                        tabIndex={tabsArray.indexOf(tab)}
                        handleTabClick={props.handleTabClick}
                        setActiveTabIndex={setActiveTabIndex}
                        key={keyNum}
                    />
        })
    }

    return (
            <Grid align="center">
                <Grid.Col span={11}>
                    <Title 
                        order={2}
                        className="wilson-logo-small"
                        // color="green"
                    >
                        <Text color="green" inherit component="span">{props.title}</Text>
                        
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
                            onClick={() => props.setEdit(true)}
                        >
                            Edit
                        </Menu.Item>
                        <Divider />
                        <Menu.Item
                            color="red" 
                            icon={<Trash size={14} />}
                            onClick={() => props.setConfirmDelete(true)}
                        >
                            Delete Project
                        </Menu.Item>
                    </Menu>
                </Grid.Col>
                <Grid.Col 
                    span={9}
                >
                    <Group spacing="xs">
                        {renderTabs(props.tabs)}
                    </Group>
                </Grid.Col>
                <Grid.Col 
                    span={3}
                    align="right"
                >
                    <Anchor href={props.github_url} target="_blank">
                        <Center inline>
                            <ActionIcon 
                                variant="hover" 
                                >
                                <BrandGithub size={16} />
                            </ActionIcon>
                            <Box ml={5}>{props.public ? "Public" : "Private"}</Box>
                        </Center>
                    </Anchor>
                </Grid.Col>
            </Grid>
    )
}
