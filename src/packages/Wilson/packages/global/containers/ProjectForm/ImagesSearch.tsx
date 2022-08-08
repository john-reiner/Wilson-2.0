import React, {useState, useEffect} from 'react'
import { Box, ActionIcon, Image, Text } from '@mantine/core';
import { ArrowRight, ArrowLeft } from 'tabler-icons-react';

interface PicInterface {
    alt: string
    small_path: string
    thumb_path: string
    photographer_username: string
    photographer_user_path: string
}

interface ImagesSearchProps {
    search: string
    reloadImages: boolean
    setReloadImages: React.Dispatch<React.SetStateAction<boolean>>
    selectImage: (e: React.MouseEvent<HTMLDivElement | MouseEvent, MouseEvent>) => void
}

export default function ImagesSearch({
    search,
    reloadImages,
    setReloadImages,
    selectImage
}: ImagesSearchProps) {

    let imageStepWidth = 210

    const [images, setImages] = useState([]);
    const [start, setStart] = useState(0);
    const [allowedImages, setAllowedImages] = useState(0);

    useEffect(() => {
        if (reloadImages) {
            fetchImages()
            setReloadImages(false)
        }
        handleResize()
    }, [reloadImages, images]);

    useEffect(() => {
        window.addEventListener('resize', handleResize)
    });

    const handleResize = () => {
        if (images && images.length > 0) {
            let imagesAllowed = Math.floor((window.innerWidth) / imageStepWidth)
            if (imagesAllowed >= 0) {
                setAllowedImages(imagesAllowed)
            }
        }
    }

    const nextImage = () => {
        if (start < (images.length - 1)) {
            setStart(start + 1)
        } else {
            setStart(0)
        }
    }

    const previousImage = () => {
        if (start > 0) {
            setStart(start - 1)
        } else  {
            setStart(images.length - 1)
        }
    }

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
        .then(images => {
            setImages(images.pics)
        });
    }

    const createArray = (startingIndex: number, allowedImages: number, images: never[]) => {
        let returnedArray: PicInterface[] = []
        let imageIndex = startingIndex
        let count = 0
        while (count < allowedImages) {
            if (imageIndex <= (images.length - 1)) {
                returnedArray.push(images[imageIndex])
                imageIndex ++
                count ++
            } else {
                imageIndex = 0
            }
        }
        return returnedArray
    }

    
    const renderImages = () => {
        if (images) {
            if (images.length > 0) {
                let key = 0
                let imagesAllowed = createArray(start, allowedImages, images)
                return imagesAllowed.map((pic) => {
                    key ++
                    return (
                        <Image
                            key={key}
                            radius="md"
                            src={pic.thumb_path}
                            alt="Random unsplash image"
                            fit="contain"
                            style={
                                {
                                    maxWidth: "200px",
                                }
                            }
                            onClick={(e) => selectImage(e)}
                            withPlaceholder
                        />
                    )
                })
            } else {
                return (
                    <Text>No Images Found</Text>
                )
            }
        }
    }

    return (
        <Box 
            style={
                    {
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center"
                    }
                }
        >
                <ActionIcon 
                    onClick={previousImage} 
                >
                    <ArrowLeft />
                </ActionIcon>
                    {renderImages()}
                <ActionIcon
                    onClick={nextImage} 
                >
                    <ArrowRight />
                </ActionIcon>                    
        </Box>
    )
}
