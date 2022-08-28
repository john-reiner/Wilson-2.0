import { Button, Stack, Paper } from '@mantine/core'
import React from 'react'
import { Plus, ListSearch } from 'tabler-icons-react'
import { ListsComponentsInterface } from '../Lists'

interface ListsNavProps {
    contentTitle: keyof ListsComponentsInterface
    setContentTitle: React.Dispatch<React.SetStateAction<keyof ListsComponentsInterface>>
    color?: string
}

export default function ListsNav({
    contentTitle,
    setContentTitle,
    color
}: ListsNavProps) {

    return (
        <Paper
            withBorder
            p="xs"
            sx={(theme) => ({
                height: '100%',
                // padding: theme.spacing.xs,
                // borderRadius: theme.radius.md,
            })}
        >
            <Stack
                spacing="xs"
            >
                <Button
                    fullWidth
                    size='xs'
                    color={color}
                    variant={contentTitle === "all" ? "filled" : "outline"}
                    onClick={() => setContentTitle("all")}
                    leftIcon={<ListSearch size={14} />}
                >
                    All Lists
                </Button>
                <Button
                    fullWidth
                    size='xs'
                    color={color}
                    variant={contentTitle === "new" ? "filled" : "outline"}
                    leftIcon={<Plus size={14} />}
                    onClick={() => setContentTitle("new")}
                >
                    New List
                </Button>
            </Stack>
        </Paper>
    )
}
