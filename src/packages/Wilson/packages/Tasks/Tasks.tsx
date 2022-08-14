import React  from 'react'

import { List } from '@mantine/core';

import Task from '../Task/Task'
import { TaskType } from '../Task/taskTypes';

interface TaskProps {
    listId: number | undefined
    listable: string
    tasks: TaskType[]
    listStatus: string
    setListStatus: React.Dispatch<React.SetStateAction<string>>
}

export default function Tasks({
    listId,
    listable,
    tasks,
    listStatus,
    setListStatus,
}: TaskProps) {

    const renderTasks = (
        tasks: TaskType[]
    ) => {
        if (tasks) {
            return tasks.map(task => {
                return <Task
                            task={{...task}}
                            key={task.id}
                            // setResetList={setResetList}
                            // setTasks={setTasks}
                            // tasks={tasks}
                            listable={listable}
                            // listableId={listableId}
                            listId={listId}
                            setListStatus={setListStatus}
                            listStatus={listStatus}
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
            {renderTasks(tasks)}
        </List>
    )
}
