import React, {useState} from 'react'

import { TextInput, Textarea, Button, Stack, Image, Divider, Group } from '@mantine/core';
import { BrandGithub } from 'tabler-icons-react';

import PictureSelectionModal from '../Project/containers/PictureSelectionModal';

export default function ProjectForm(props) {


    const [photoSelectOpen, setPhotoSelectOpen] = useState(false);

    return (
        <div>
            <PictureSelectionModal
                opened={photoSelectOpen}
                setOpened={setPhotoSelectOpen}
                image={props.project.image}
                handleChange={props.handleChange}
                setProject={props.setProject}
                project={props.project}
                setPhotoSelectOpen={setPhotoSelectOpen}
                setFetchAgainFlag={props.setFetchAgainFlag}
            />
            <form onSubmit={props.handleSubmit}>
                <Stack>
                    <TextInput
                        placeholder="Example Project..."
                        label="Project Name"
                        required
                        name="title" 
                        value={props.project.title} 
                        onChange={props.handleChange}
                    />
                    <Textarea
                        placeholder="Description..."
                        label="Project Description"
                        name="description" 
                        value={props.project.description} 
                        onChange={props.handleChange}
                    />
                    <TextInput 
                        label="GitHub URL" 
                        placeholder="github" 
                        icon={<BrandGithub size={14} />} 
                        name="github_url"
                        value={props.project.github_url} 
                        onChange={props.handleChange}
                    />
                    { props.project.image ?  
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
                                src={props.project.image}
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
