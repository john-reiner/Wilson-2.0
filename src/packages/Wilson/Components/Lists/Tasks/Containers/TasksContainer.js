import React, {useState, useEffect}  from 'react'
import { List } from '@mantine/core';
import Task from '../Components/Task'

export default function TasksContainer(props) {

    const renderTasks = (tasks) => {
        if (tasks) {
            return tasks.map(task => {
                return <Task
                            task={{...task}}
                            key={task.id}
                            setResetList={props.setResetList}
                            setTasks={props.setTasks}
                            tasks={props.tasks}
                            listable={props.listable}
                            listableId={props.listableId}
                            listId={props.listId}
                            id={task.id}
                            setListStatus={props.setListStatus}
                            listStatus={props.listStatus}
                        />
            })
        }
    }

    return (
        <List
            spacing="xs"
            size="sm"
            center
            withPadding
        >
            {renderTasks(props.tasks)}
        </List>
    )
}
