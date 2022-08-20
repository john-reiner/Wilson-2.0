import { Button, Stack } from '@mantine/core'
import React from 'react'
import { Plus, ListSearch } from 'tabler-icons-react'
import { ListsComponentsInterface } from '../Lists'

interface ListsNavProps {
    contentTitle: keyof ListsComponentsInterface
    setContentTitle: React.Dispatch<React.SetStateAction<keyof ListsComponentsInterface>>
}

export default function ListsNav({
    contentTitle,
    setContentTitle
}: ListsNavProps) {

    return (
        <Stack
            spacing="xs"
        >
            { contentTitle !== 'new' &&
                <Button
                    fullWidth
                    size='xs'
                    color="blue"
                    leftIcon={<Plus size={14} />}
                    onClick={() => setContentTitle("new")}
                >
                    New List
                </Button>
            }
                {contentTitle !== "all" &&
                    <Button
                        fullWidth
                        color="green"
                        size='xs'
                        onClick={() => setContentTitle("all")}
                        leftIcon={<ListSearch size={14} />}
                    >All Lists</Button>
                }
        </Stack>
    )
}
