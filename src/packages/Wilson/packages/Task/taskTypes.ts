import { ListType } from "../List/listTypes"

export interface TaskType {
    id?: number
    content: string
    completed: boolean
    list_id?: number
    description: string
    list?: ListType
}