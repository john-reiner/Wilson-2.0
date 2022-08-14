import React, {useState } from 'react'
import { NewProjectInterface, ProjectInterface } from '../../interfaces/projectInterfaces';

import { Divider, Textarea, Grid, Image, TextInput, Button, Stack, Modal, Text } from '@mantine/core'
import ImagesSearch from './ImagesSearch';

interface PictureSelectionModalProps {
    opened: boolean
    setOpened: React.Dispatch<React.SetStateAction<boolean>>
    setProject: React.Dispatch<React.SetStateAction<ProjectInterface>> | React.Dispatch<React.SetStateAction<NewProjectInterface>>
    project: ProjectInterface | NewProjectInterface
}

export default function PictureSelectionModal({
    opened,
    setOpened,
    setProject,
    project,
}: PictureSelectionModalProps) {


    const [search, setSearch] = useState('');
    const [reloadImages, setReloadImages] = useState(false);
    const [imageURL, setImageURL] = useState(project.image);
    const [showImagesContainer, setShowImagesContainer] = useState(false);

    const handleSearchChange = (
        e: React.ChangeEvent<HTMLInputElement>
        ) => setSearch(e.target.value)

    const handleImageURLChange = (
        e: React.ChangeEvent<HTMLTextAreaElement>
        ) => {
        setImageURL(e.target.value)
    }

    const selectImage = (
        e: React.MouseEvent<HTMLDivElement | MouseEvent>
    ) => {
        // setImageURL(e.target.currentSrc)
        // setProject({...project, image: e.target.currentSrc})
    }

    const handleSearch = () => {
        setReloadImages(true)
        setShowImagesContainer(true)
    }


    return (
        <Modal
            opened={opened}
            onClose={() => setOpened(false)}
            title="Project Photo"
            size={'full'}
        >
            <Stack>
                <Grid

                >
                    <Grid.Col xs={6}>
                        {project.image ? 
                            <Image
                                radius="md"
                                src={project.image}
                                alt="Random unsplash image"
                                style={{
                                            cursor: "pointer"
                                        }}
                                height={200}
                            />
                            : 
                            <Text>Select or search for a photo to add a photo to your project.</Text>
                        }
                    </Grid.Col>
                    <Grid.Col xs={6}>
                        <Textarea
                            label="Project Image URL"
                            placeholder="Image URL"
                            name="image"
                            autosize
                            minRows={7}
                            maxRows={7}
                            value={imageURL} 
                            onChange={handleImageURLChange}
                        />
                    </Grid.Col>
                </Grid>
            </Stack>
            <Divider my="xs"/>
            <Grid grow>
                <Grid.Col span={10}>
                    <TextInput
                        name='search'
                        placeholder="Search for Images"
                        onChange={handleSearchChange}
                        value={search}
                    />
                </Grid.Col>
                <Grid.Col span={2}>
                    <Button
                        onClick={handleSearch}
                        fullWidth
                        variant='outline'
                    >
                        Search
                    </Button>
                </Grid.Col>
            </Grid>

            {/* </Center> */}
            <Divider my="xs"/>
            {showImagesContainer && 
                <ImagesSearch
                    search={search}
                    reloadImages={reloadImages}
                    setReloadImages={setReloadImages}
                    selectImage={selectImage}
                />
            }
            <Divider my="xs"/>
            <Stack>
                <Button disabled={!project.image} onClick={() => setOpened(false)}>Set Photo</Button>
            </Stack>
        </Modal>
    )
}
