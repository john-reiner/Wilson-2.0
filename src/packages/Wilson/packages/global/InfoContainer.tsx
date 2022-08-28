import React from 'react'
import { Box, Group, Paper, Title, Text, Divider } from '@mantine/core';
import { featuresDataType } from './interfaces/projectInterfaces';


interface InfoContainerProps {
    render: JSX.Element
    color?: string
    totals?: number
    title?: string
}

export default function InfoContainer({
    render,
    color,
    totals,
    title
}: InfoContainerProps) {

    return (
        <Box
            sx={(theme) => ({
                borderRadius: theme.radius.sm,
                border: `solid 1px ${color}`,
            })}
        >
            {title && 
                <>
                    <Paper
                        p={'xs'}
                    >
                        <Group
                            position="apart"
                        >
                            <Title 
                                order={4}
                                color={color}
                                className='wilson-logo-small'
                            >
                                {title}
                            </Title>
                            { totals && 
                                <Text
                                    color={color}
                                    className='wilson-logo-small'
                                >
                                    Total: {totals}
                                </Text>
                            }
                        </Group>
                    </Paper>
                    <Divider color={color} />
                </>
            }
            {render}
        </Box>
    )
}