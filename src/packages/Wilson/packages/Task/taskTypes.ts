export interface TaskType {
    id?: number
    content: string
    completed: boolean
    list_id?: number
    description: string
    list_info: {
        title: string
        status: string
    }
}