import React from 'react'
import {SegmentedControl} from '@mantine/core';

export default function ListStatusNav(props) {

    const data = [
        { label: 'Incomplete', value: 'incomplete' },
        // { label: 'Not Started', value: 'pending' },
        // { label: 'Working', value: 'working' },
        // { label: 'Ready for Complete', value: 'ready' },
        { label: 'Completed', value: 'completed' },
    ]

    return (
        <SegmentedControl
            color="green"
            data={data}
            onChange={props.setStatus}
            value={props.status}
        />
    )
}
