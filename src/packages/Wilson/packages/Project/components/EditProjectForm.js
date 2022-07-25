import React, {useState} from 'react'

import { TextInput, Textarea, Button, Stack, Image, Divider, Group } from '@mantine/core';
import { BrandGithub } from 'tabler-icons-react';

import PictureSelectionModal from '../containers/PictureSelectionModal';

export default function EditProjectForm(props) {

    const [project, setProject] = useState(props.project);
    const [photoSelectOpen, setPhotoSelectOpen] = useState(false);

    const handleChange = e => setProject({...project, [e.target.name]:e.target.value})

    const handleSubmit = e => {
        e.preventDefault()
        fetch(`http://localhost:3001/api/v2/projects/${project.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "bearer " + localStorage.getItem('wilsonUserToken')
                },
                body: JSON.stringify({project: project})
                })
        .then(response => response.json())
        .then(payload => {
            props.setFetchAgainFlag(true)
            props.setModalOpen(false)
        })
        .catch(errors => {
            console.error(errors)
        })
    }

    // const renderPhotoSelect = (photoSelect) => {
    //     if (photoSelect) {
    //         return (
    //             <PictureSelectionContainer
    //                 image={project.image}
    //                 handleChange={handleChange}
    //                 setProject={setProject}
    //                 project={project}
    //                 // setPhotoSelect={setPhotoSelect}
    //             />
    //         )
    //     } else {
    //         return (
    //             <div>
    //                 <Text>Project Photo</Text>
    //                 <Image
    //                     style={{
    //                         cursor: "pointer"
    //                     }}
    //                     height={200}
    //                     src={project.image}
    //                     radius="sm"
    //                     // onClick={() => setPhotoSelect(true)}
    //                 />
    //             </div>
    //         )        
    //     }
    // }

    return (
        <div>
            <PictureSelectionModal
                opened={photoSelectOpen}
                setOpened={setPhotoSelectOpen}
                image={project.image}
                handleChange={handleChange}
                setProject={setProject}
                project={project}
                setPhotoSelectOpen={setPhotoSelectOpen}
                setFetchAgainFlag={props.setFetchAgainFlag}
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
