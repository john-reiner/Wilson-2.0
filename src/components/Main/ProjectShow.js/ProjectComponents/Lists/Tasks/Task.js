import React, {useState} from 'react'
import { Box, ActionIcon, Paper,} from '@mantine/core';
import { CircleCheck, CircleDashed, FileX } from 'tabler-icons-react';
import TaskShow from './TaskShow';

export default function Task(props) {

    const [opened, setOpened] = useState(false);

    return (
        <Paper 
            shadow="md" 
            radius="xs" 
            p="xs" 
            withBorder
        >
            <TaskShow 
                opened={opened}
                setOpened={setOpened}
                content={props.content}
            />
                <Box 
                    style={
                        {
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center"
                        }
                    }
                >
                    <ActionIcon onClick={() => console.log("clicked")} color={props.completed ? "green" : "blue"} size={24} radius="xl">{ props.completed ? <CircleCheck size={16} /> : <CircleDashed/>}</ActionIcon>
                    <Box 
                        onClick={() => setOpened(true)}
                        sx={(theme) => ({
                            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
                            // textAlign: 'center',
                            padding: theme.spacing.sm,
                            borderRadius: theme.radius.xs,
                            cursor: 'pointer',
                            width: "100%",
                            marginLeft: theme.spacing.sm,

                            '&:hover': {
                            backgroundColor:
                                theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1],
                            },
                        })}
                    >
                        {props.content}
                    </Box>
                </Box>
        </Paper>
    )
}
