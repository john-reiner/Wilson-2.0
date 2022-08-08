import React, {useState} from 'react'
import { ProjectInterface, NewProjectInterface } from '../../interfaces/projectInterfaces';

import { TextInput, Textarea, Button, Stack, Image, Divider } from '@mantine/core';
import { BrandGithub } from 'tabler-icons-react';

import PictureSelectionModal from './PictureSelectionModal';

interface ProjectFormProps {
    project: ProjectInterface | NewProjectInterface
    setProject: React.Dispatch<React.SetStateAction<ProjectInterface>> | React.Dispatch<React.SetStateAction<NewProjectInterface>>
    handleChange: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => void
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
}

export default function ProjectForm({
    project,
    setProject,
    handleChange,
    handleSubmit
}: ProjectFormProps) {

    const [photoSelectOpen, setPhotoSelectOpen] = useState(false);

    return (
        <div>
            <PictureSelectionModal
                opened={photoSelectOpen}
                setOpened={setPhotoSelectOpen}
                setProject={setProject}
                project={project}
            />
            <form onSubmit={handleSubmit}>
                <Stack>
                    <TextInput
                        placeholder="Example Project..."
                        label="Project Name"
                        required
                        name="title" 
                        value={project.title} 
                        onChange={handleChange}
                    />
                    <Textarea
                        placeholder="Description..."
                        label="Project Description"
                        name="description" 
                        value={project.description} 
                        onChange={handleChange}
                    />
                    <TextInput 
                        label="GitHub URL" 
                        placeholder="github" 
                        icon={<BrandGithub size={14} />} 
                        name="github_url"
                        value={project.github_url} 
                        onChange={handleChange}
                    />
                    { project.image ?  
                        <Stack>
                            <Button 
                                variant="subtle" 
                                size="xs"
                                onClick={() => setPhotoSelectOpen(true)}
                            >
                                Change Photo
                            </Button>
                            <Image
                                style={{
                                    cursor: "pointer"
                                }}
                                height={200}
                                src={project.image}
                                radius="sm"
                            />
                        </Stack>
                        :
                        <Stack>
                            <Button 
                                    variant="subtle" 
                                    size="xs"
                                    onClick={() => setPhotoSelectOpen(true)}
                                >
                                    Add a Photo
                            </Button>        
                        </Stack>
                    }
                    <Divider/>
                    <Button
                        type="submit"
                        fullWidth
                        color="green"
                        variant="outline"
                    >
                        Submit
                    </Button>
                </Stack>
            </form>            
        </div>
    )
}
