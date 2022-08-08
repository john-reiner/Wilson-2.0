export interface ProjectInterface {
    id: number
    title: string
    description?: string
    github_url?: string
    image?: string
}

export interface ProjectComponents {
    info: JSX.Element;
    lists: JSX.Element;
    features: JSX.Element;
    notes: JSX.Element;
}

export interface NewProjectInterface {
    title: ""
    description: ""
    github_url: ""
    image: ""
}