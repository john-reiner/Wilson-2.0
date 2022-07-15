import React, {useState, useEffect}  from 'react'
import { List } from '@mantine/core';
import Task from '../Components/Task/Task'

export default function TasksContainer(props) {

    const renderTasks = (tasks) => {
        if (tasks) {
            return tasks.map(task => {
                return <Task
                            task={{...task}}
                            key={task.id}
                            setReloadLists={props.setReloadLists}
                            setTasks={props.setTasks}
                            tasks={props.tasks}
                            listable={props.listable}
                            listableId={props.listableId}
                            listId={props.listId}
                            id={task.id}
                            setListStatus={props.setListStatus}
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