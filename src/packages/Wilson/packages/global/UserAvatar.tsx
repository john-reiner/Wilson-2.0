import React from 'react'
import { Avatar, HoverCard, Text } from '@mantine/core'
import { Author } from './containers/DisplayAllLinks/DisplayAllLinks'

type UserAvatarProps = {
    author: Author
}

export default function UserAvatar({
    author
}: UserAvatarProps){

    return (
        <HoverCard width={'fit-content'} shadow="md">
            <HoverCard.Target>
                <Avatar color="cyan" radius="xl">{author.initials}</Avatar>
            </HoverCard.Target>
            <HoverCard.Dropdown>
            <Text size="sm">
                {author.full_name}
            </Text>
            </HoverCard.Dropdown>
        </HoverCard>
    )
}