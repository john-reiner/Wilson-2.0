import React, {useState } from 'react'

import { Divider, ActionIcon, Textarea, Title, Grid, Image, TextInput, Group, Button, Stack, Modal } from '@mantine/core'
import { Search } from 'tabler-icons-react';
import ImagesSearch from './ImagesSearch';

export default function PictureSelectionModal(props) {


    const [search, setSearch] = useState('');
    const [reloadImages, setReloadImages] = useState(false);
    const [imageURL, setImageURL] = useState(props.image);
    const [showImagesContainer, setShowImagesContainer] = useState(false);

    const handleSearchChange = e => setSearch(e.target.value)

    const handleImageURLChange = (e) => {
        setImageURL(e.target.value)
    }

    const selectImage = (e) => {
        setImageURL(e.target.currentSrc)
        props.setProject({...props.project, image: e.target.currentSrc})
    }

    const uploadPic = e => {
        e.preventDefault()
        fetch(`http://localhost:3001/api/v2/projects/${props.project.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "bearer " + localStorage.getItem('wilsonUserToken')
                },
                body: JSON.stringify({image: imageURL})
                })
        .then(response => response.json())
        .then(payload => {
            props.setFetchAgainFlag(true)
            props.setPhotoSelectOpen(false)
            props.setProject({...props.project, "image": payload.image})
        })
        .catch(errors => {
            console.error(errors)
        })
    }

    const handleSearch = () => {
        setReloadImages(true)
        setShowImagesContainer(true)
    }


    return (
        <Modal
            opened={props.opened}
            onClose={() => props.setOpened(false)}
            title="Update Project Photo"
            size={'full'}
        >
            <form onSubmit={uploadPic}>
                <Stack>
                    <Grid

                    >
                        <Grid.Col xs={6}>
                            <Image
                                radius="md"
                                src={props.image}
                                alt="Random unsplash image"
                                style={{
                                            cursor: "pointer"
                                        }}
                                height={200}
                            />
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
                    <Button type="submit">Submit</Button>
                </Stack>
            </form>
            <Divider my="xs"/>
            {/* <Center 
                // position="apart" 
                inline
            > */}
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
        </Modal>
    )
}
