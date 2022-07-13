import React from 'react'
import { Box, ActionIcon, Button, Title, Text, TextInput}  from '@mantine/core';
import { Trash, Edit, ListCheck, Activity, ArrowBarRight } from 'tabler-icons-react';

import ListBadge from '../Components/ListBadge';
import EditTitleForm from '../Components/EditTitleForm';

export default function ListTitleContainer(props) {

    const renderStatus = (status) => {
        if (status === "ready" || status === "completed") {
            return (
                <Button 
                    leftIcon={
                        status === "ready" ? <ListCheck size={14} /> : <Activity size={14} />
                    }
                    variant="outline" 
                    color={status === "ready" && "green"}
                    onClick={props.handleListComplete}
                >
                    {status === "ready" ? "Complete" : "Open"}
                </Button>
            )
        }
        return (
            <ListBadge
                status={status}
            />
        )
    }

    const renderTitle = edit => {
        if (edit) {
            return (
                <EditTitleForm
                    title={props.list.title}
                    handleChange={props.handleChange}
                    updateList={props.updateList}
                />
            )
        }
        return (
            <Title order={4}>
                <Text lineClamp={1}>
                    {props.list.title}
                </Text>
            </Title>
        )
    }

    return (
            <Box
                    style={
                        {
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }
                    }
                >
                    {renderStatus(props.listStatus)}
                    {renderTitle(props.edit)}
                    <Box 
                        style={
                            {
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                
                            }
                        }
                    >
                        <ActionIcon 
                            variant="outline"
                            onClick={() => props.setEdit(!props.edit)}
                            style={{marginLeft: ".5em"}}
                        >
                            <Edit size={16} />
                        </ActionIcon>
                        <ActionIcon 
                            variant="outline" 
                            color="red"
                            style={{marginLeft: ".5em"}}
                            onClick={() => props.setDeleteModalOpen(true)}
                        >
                            <Trash size={16} />
                        </ActionIcon>
                    </Box>
            </Box>
    )
}
