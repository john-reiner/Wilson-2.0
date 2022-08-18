import React, { useEffect, useState }  from 'react'

import { List } from '@mantine/core';

import Task from '../Task/Task';
import { TaskType } from '../Task/taskTypes';
import { ListType } from '../List/listTypes';
import NewTask from './components/NewTask'

interface TasksProps {
    listId: number | undefined
    route: string
    setList: React.Dispatch<React.SetStateAction<ListType>>
    list: ListType
}

export default function Tasks({
    listId,
    route,
    setList,
    list,
}: TasksProps) {

    const [tasks, setTasks] = useState<TaskType[]>([])
    const [reloadTasks, setReloadTasks] = useState(true)

    const tasksRoute = `${route}/tasks`

    // get all tasks when this component mounts
    useEffect(() => {
        if (reloadTasks) {
            fetchTasks(route, listId)
            setReloadTasks(false)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [reloadTasks])

    const handleNewTask = (
        newTask: TaskType
    ) => {
        setList({...list, status: newTask.list_info.status})
        setTasks([...tasks, newTask ])
    }
    
    const fetchTasks = (
        route: string,
        listId: number | undefined
    ) => {
        fetch(tasksRoute, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "bearer " + localStorage.getItem('wilsonUserToken')
                },
            }
        )
        .then(response => response.json())
        .then(payload => {
            setTasks(payload)
        })
        .catch(errors => {
            console.error(errors)
        })
    }

    const renderTasks = (
        tasks: TaskType[]
    ) => {
        if (tasks) {
            return tasks.map(task => {
                return <Task
                            taskProps={{...task}}
                            key={task.id}
                            setList={setList}
                            list={list}
                            route={tasksRoute}
                            setReloadTasks={setReloadTasks}
                        />
            })
        }
    }

    return (
        <div>
            <NewTask
                listId={list.id}
                route={tasksRoute}
                handleNewTask={handleNewTask}
            />   
            <List
                spacing="xs"
                size="sm"
                center
                withPadding
            >
                {renderTasks(tasks)}
            </List>
        </div>
    )
}
