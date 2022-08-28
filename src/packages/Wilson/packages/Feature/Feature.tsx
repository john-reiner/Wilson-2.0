import React, {useState, useEffect} from 'react'

import { 
    Divider,
    Modal
} from '@mantine/core';

import MainContainerHeader from '../global/MainContainerHeader'
import FeatureInfoContainer from './containers/Info/FeatureInfo';
import Lists from '../Lists/Lists';
import Notes from '../Notes/Notes';
import FeatureForm from '../Features/Components/FeatureForm';
import DeleteModalConfirmation from '../global/DeleteModalConfirmation';
import { FeatureComponents } from './FeatureTypes';
import { FeatureType } from '../Features/featureTypes';

interface FeatureProps{
    setFeatureModalOpen: React.Dispatch<React.SetStateAction<boolean>>
    featureModalOpen: true
    setReloadFeatures: React.Dispatch<React.SetStateAction<boolean>>
    route: string
    handleFeatureClose: () => void
}

export default function FeatureModalContainer({
    setFeatureModalOpen,
    featureModalOpen,
    setReloadFeatures,
    route,
    handleFeatureClose
}: FeatureProps) {

    const [feature, setFeature] = useState<FeatureType>({
        title: "",
        description: "",
        author: "",
        due_date: "",
        status: "created",
        priority: "low"
    });
    const [featureContent, setFeatureContent] = useState<keyof FeatureComponents>("info");
    const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);

    useEffect(() => {
        fetchFeature()
    }, []);

    const handleEditFeature = () => setFeatureContent("edit")

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>
    ) => setFeature({...feature, [e.target.name]: e.target.value})

    const handleDeleteConfirmationShow = () => setDeleteConfirmOpen(true)

    const handleDelete = () => {
        setFeatureModalOpen(false)
        setReloadFeatures(true)
    }

    const updateFeature = (
        feature: object
    ) => {
        fetch(route, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "bearer " + localStorage.getItem('wilsonUserToken')
                },
                body: JSON.stringify({feature: feature})
                })
        .then(response => response.json())
        .then(payload => {
            setFeature(payload)
            setFeatureContent("info")
        })
        .catch(errors => {
            console.error(errors)
        })
    }

    const handleSubmit = (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault()
        updateFeature(feature)
    }

    const fetchFeature = () => {
        fetch(route)
        .then(response => response.json())
        .then(payload => {
            setFeature(payload)
        })
        .catch(errors => {
            console.error(errors)
        })
    }

    const handleTabClick= (
        tabName: keyof FeatureComponents
    ) => {
        setFeatureContent(tabName)
    }

    const featureShowTabs = ["Info", "Lists", "Notes"]

    const featureComponents = {
        info: <FeatureInfoContainer
                feature={{...feature}}
                setFeature={setFeature}
                route={route}
            />,
        lists: <Lists
                route={route}
            />,
        notes: <Notes
                route={route}
            />,
        edit: <FeatureForm
                feature={{...feature}}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
            />
    }

    const renderContent = (
        featureComponents: FeatureComponents,
        componentToShow: keyof FeatureComponents
    ) => featureComponents[componentToShow]
    
    return (
        <Modal
            opened={featureModalOpen}
            onClose={handleFeatureClose}
            closeOnClickOutside={false}
            size="100%"
        >
            {deleteConfirmOpen &&
                <DeleteModalConfirmation 
                    route={route}
                    successFunction={handleDelete}
                    opened={deleteConfirmOpen}
                    setOpened={setDeleteConfirmOpen}
                    item="Feature"
                />
            }
            <MainContainerHeader 
                title={feature.title}
                handleTabClick={handleTabClick}
                handleEditClick={handleEditFeature}
                tabs={featureShowTabs}
                type="Feature"
                handleDeleteClick={handleDeleteConfirmationShow}
            />
            <Divider my="xs" />
            {renderContent(featureComponents, featureContent)}
        </Modal>
    )
}
