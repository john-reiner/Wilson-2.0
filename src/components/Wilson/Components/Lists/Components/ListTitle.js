import React from 'react'

export default function ListTitle(props) {
    return (
        <Title order={4}>
            <Text lineClamp={1}>
                {props.list.title}
            </Text>
        </Title>
    )
}
