export interface AuthorType {
    initials: string
    full_name: string
}

export interface featuresDataType {
    total: number
    status: {
        created: number,
        paused: number,
        working: number,
        ready: number,
        completed: number
    }
    priorities: {
        low: number
        medium: number
        high: number
    }
}



export interface ProjectInterface {
    id?: number
    title: string
    description: string
    github_url?: string
    image?: string
    author: AuthorType
    features_count?: number
    created?: string
    modified?: string
    color?: string
    color_name?: string
    features_data?: featuresDataType
}

export interface ProjectComponents {
    info: JSX.Element;
    lists: JSX.Element;
    features: JSX.Element;
    notes: JSX.Element;
}