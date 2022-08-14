import { TaskType } from "../Task/taskTypes"

export interface ListType {
    id: number | string
    title: string
    status: string
    author: string
    tasks: TaskType[]
}

export interface ListsComponentsInterface {
    new: JSX.Element;
    all: JSX.Element;
    list: JSX.Element;
}