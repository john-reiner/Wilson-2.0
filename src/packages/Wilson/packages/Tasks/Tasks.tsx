import React  from 'react'

import { List } from '@mantine/core';

import Task from '../Task/Task';
import { TaskType } from '../Task/taskTypes';
import { ListType } from '../List/listTypes';

interface TaskProps {
    listId: number | undefined
    listable: string
    tasks: TaskType[]
    route: string
    setList: React.Dispatch<React.SetStateAction<ListType>>
    list: ListType
    handleListStatusToggled: () => void
}

export default function Tasks({
    listId,
    listable,
    tasks,
    route,
    setList,
    list,
    handleListStatusToggled
}: TaskProps) {

    const renderTasks = (
        tasks: TaskType[]
    ) => {
        if (tasks) {
            return tasks.map(task => {
                return <Task
                            task={{...task}}
                            key={task.id}
                            setList={setList}
                            list={list}
                            // setResetList={setResetList}
                            // setTasks={setTasks}
                            // tasks={tasks}
                            listable={listable}
                            // listableId={listableId}
                            listId={listId}
                            route={route}
                            handleListStatusToggled={handleListStatusToggled}
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
