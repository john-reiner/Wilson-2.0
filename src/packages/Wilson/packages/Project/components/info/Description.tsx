import React from 'react'
import {Box, Divider, Paper, Text, Title} from '@mantine/core'
import { bottom } from '@popperjs/core'

interface DescriptionProps {
    description: string
    color?: string
}

export default function Description({
    description,
    color
}:DescriptionProps) {



    return (
        <Box
            sx={(theme) => ({
                padding: theme.spacing.xs,

            })}
        >

            <Text lineClamp={4}>
                {description}
            </Text>
        </Box>
    )
}