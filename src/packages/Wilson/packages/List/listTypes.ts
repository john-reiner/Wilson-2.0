export interface ListType {
    id: number | string
    title: string
    status: string
    author: string
    tasks: object[]
}

export interface ListsComponentsInterface {
    new: JSX.Element;
    all: JSX.Element;
    list: JSX.Element;
}