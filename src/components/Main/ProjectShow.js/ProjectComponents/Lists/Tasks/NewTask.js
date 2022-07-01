import React from 'react'
import { Box, Paper, ActionIcon, TextInput} from '@mantine/core';
import { ArrowBarDown, CircleDashed, FileX } from 'tabler-icons-react';

export default function NewTask(props) {
    return (
        <Paper 
            shadow="md" 
            radius="xs" 
            p="xs" 
            withBorder
        >
                <form onSubmit={props.handleSubmit}>
                <Box 
                    style={
                        {
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center"
                        }
                    }
                >
                        <ActionIcon type="submit" color={"green"}>
                            <ArrowBarDown />
                        </ActionIcon>
                        <Box 
                            sx={(theme) => ({
                                backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
                                // textAlign: 'center',
                                // padding: theme.spacing.sm,
                                borderRadius: theme.radius.xs,
                                // cursor: 'pointer',
                                width: "100%",
                                marginLeft: theme.spacing.sm,
                            })}
                        >
                            <TextInput
                                placeholder="List Item..."
                                radius="xs"
                                required
                                name="content"
                                value={props.listTask.content}
                                onChange={props.handleChange}
                            />
                        </Box>
                </Box>
                </form>
        </Paper>
    )
}
