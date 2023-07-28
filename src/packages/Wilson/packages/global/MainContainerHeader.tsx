import React, {useState} from 'react'
import { 
    ActionIcon, 
    Menu, 
    Grid, 
    Title, 
    Divider,
    Text
} from '@mantine/core';
import { Settings, Edit, Trash } from 'tabler-icons-react';

interface MainContainerHeaderProps {
    color: string | undefined
    title: string
    handleEditClick: () => void
    handleDeleteClick: () => void
    type: string
}

export default function MainContainerHeader({
    color,
    title,
    handleEditClick,
    type,
    handleDeleteClick
}: MainContainerHeaderProps) {

    return (
            <Grid align="center">
                <Grid.Col span={11}>
                    <Title 
                        order={2}
                        className="wilson-logo-small"
                    >
                        <Text color={color} inherit component="span">{title}</Text>
                        
                    </Title>
                </Grid.Col>

                <Grid.Col 
                    span={1}
                    // align="right"
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
                                onClick={handleEditClick}
                            >
                                Edit
                            </Menu.Item>
                            <Divider />
                            <Menu.Item
                                color="red" 
                                icon={<Trash size={14} />}
                                onClick={handleDeleteClick}
                            >
                                Delete {type}
                            </Menu.Item>
                        </Menu.Dropdown>
                    </Menu>
                </Grid.Col>
            </Grid>
    )
}
