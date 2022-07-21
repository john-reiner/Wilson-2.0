import React, {useState, useEffect} from 'react'
import { Divider, Paper, Textarea, Title, Grid, Image, TextInput, Group, Button } from '@mantine/core'

export default function PictureSelectionContainer(props) {

    const [images, setImages] = useState([]);
    const [search, setSearch] = useState('projects');
    const [reloadImages, setReloadImages] = useState(true);

    useEffect(() => {
        fetchImages()
        setReloadImages(false)
    }, [reloadImages]);

    const handleSearchChange = e => setSearch(e.target.value)

    const fetchImages = () => {
        fetch('http://localhost:3001/api/v2/images', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': "bearer " + localStorage.getItem('wilsonUserToken')
            },
            body: JSON.stringify({search: search})
        })
        .then(response => response.json())
        .then(data => {
            setImages(data)
        });
    }

    const renderImages = () => {
        if (images.pics) {
            return images.pics.map(pic => {
                return (
                    <Grid.Col span={4}
                        key={images.pics.indexOf(pic)}
                    >
                        <Image
                            id={images.pics.indexOf(pic)}
                            radius="md"
                            src={pic}
                            alt="Random unsplash image"
                            width={200}
                            height={80}
                            fit="contain"
                            onClick={(e) => selectImage(e)}
                        />
                    </Grid.Col>
                )
            })
        }
    }

    const selectImage = (e) => {
        props.setProject({...props.project, image: e.target.currentSrc})
    }

    return (
        <Paper
            shadow="xs" 
            radius="xs" 
            p="md" 
            withBorder
        >
            <Title order={4}>Choose a Project Image</Title>
            <Divider my="xs"/>
            <Textarea
                label="Project Image URL"
                placeholder="Image URL"
                name="image"

                value={props.image} 
                onChange={props.handleChange}
            />
            <Title order={4}>Select a free image to use:</Title>
            <Divider my="xs"/>
            <Group position="apart">
                <TextInput
                    name='search'
                    label="Search for Images"
                    onChange={handleSearchChange}
                    value={search}
                />
                <Button 
                    variant="outline" 
                    onClick={() => setReloadImages(true)}>Submit</Button>
            </Group>
            <Divider my="xs"/>

            <Grid grow>
                {renderImages()}
            </Grid>
        </Paper>
    )
}
