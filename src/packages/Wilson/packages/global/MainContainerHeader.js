import React, {useState} from 'react'
import { 
    ActionIcon, 
    Menu, 
    Grid, 
    Title, 
    Divider,
    Anchor,
    Box,
    Space,
    Text
} from '@mantine/core';
import { Settings, Edit, Trash, BrandGithub, InfoSquare } from 'tabler-icons-react';
import { useDisclosure } from '@mantine/hooks';

import Tab from './Tab';
import Project from '../Project/Project';

export default function MainContainerHeader(props) {

    const [opened, handlers] = useDisclosure(false);
    const [activeTabIndex, setActiveTabIndex] = useState(0);

    const renderTabs = (tabsArray) => {
        let keyNum = -1
        return tabsArray.map(tab => {
            keyNum ++
            return <Tab 
                        color={props.color}
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
                    >
                        <Text color={props.color} inherit component="span">{props.title}</Text>
                        
                    </Title>
                </Grid.Col>

                <Grid.Col 
                    span={1}
                    align="right"
                >
                    <Menu 
                        trigger="hover" 
                        width={200} 
                        openDelay={100} 
                        closeDelay={400}
                        position="bottom-end"
                        withArrow
                    >
                        <Menu.Target>
                            <ActionIcon><Settings size={16} /></ActionIcon>
                        </Menu.Target>
                        <Menu.Dropdown>
                            <Menu.Item
                                icon={<Edit size={14} />}
                                onClick={props.handleEditClick}
                            >
                                Edit
                            </Menu.Item>
                            <Divider />
                            <Menu.Item
                                color="red" 
                                icon={<Trash size={14} />}
                                onClick={props.handleDeleteClick}
                            >
                                Delete {props.type}
                            </Menu.Item>
                        </Menu.Dropdown>
                    </Menu>
                </Grid.Col>
            </Grid>
    )
}
