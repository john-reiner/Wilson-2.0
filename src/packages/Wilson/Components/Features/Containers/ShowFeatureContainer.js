import React, {useState, useEffect} from 'react'
import { 
    Divider,
    Modal
} from '@mantine/core';

import MainContainerHeader from '../../../Containers/MainContainer/MainContainerHeader'
import FeatureInfoContainer from './Info/FeatureInfoContainer';
import ListsContainer from '../../Lists/Containers/ListsContainer';
import NotesContainer from '../../Notes/Containers/NotesContainer';
import FeatureForm from '../Components/FeatureForm';
import DeleteModalConfirmation from '../../../Containers/DeleteModalConfirmation';

export default function FeatureModalContainer(props) {

    const [featureContent, setFeatureContent] = useState("Info");
    const [feature, setFeature] = useState({});
    const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
    const [updateFeatureFlag, setUpdateFeatureFlag] = useState(false);

    useEffect(() => {
        if (typeof props.featureId === "number") {
            fetchFeature()
        }
        if (updateFeatureFlag && typeof feature.id === "number") {
            console.log("HERE")
            updateFeature()
            setUpdateFeatureFlag(false)
        }
    }, [props.featureId, updateFeatureFlag]);

    const handleEditFeature = () => {
        setFeatureContent("Form")
    }

    const handleChange = e => setFeature({...feature, [e.target.name]: e.target.value})
    const togglePublic = e => setFeature({...feature, [e.target.name]:e.target.checked})
    const changeDate = e => setFeature({...feature, 'due_date':e.toString()})

    const handleDeleteClick = () => setDeleteConfirmOpen(true)
    const handleDelete = () => {
        props.setFeatureModalOpen(false)
        props.setFetchAgainFlag(true)
    }

    const updateFeature = (payloadToUpdate) => {
        fetch(`http://localhost:3001/api/v2/features/${feature.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "bearer " + localStorage.getItem('wilsonUserToken')
                },
                body: JSON.stringify({feature: payloadToUpdate})
                })
        .then(response => response.json())
        .then(payload => {
            if (payload.status === "ok") {
                setFeatureContent("Info")
            }
        })
        .catch(errors => {
            console.error(errors)
        })
    }

    const handleSubmit = e => {
        e.preventDefault()
        updateFeature(feature)
    }

    const fetchFeature = () => {
        fetch(`http://localhost:3001/api/v2/features/${props.featureId}`)
        .then(response => response.json())
        .then(payload => {
            setFeature(payload)
        })
        .catch(errors => {
            console.error(errors)
        })
    }

    const handleTabClick= (tabName) => {
        setFeatureContent(tabName)
    }

    const featureShowTabs = ["Info", "Lists", "Notes"]

    const featureComponent = [
        [<FeatureInfoContainer
            feature={{...feature}}
            setFeature={setFeature}
            updateFeature={updateFeature}
            setFetchAgainFlag={props.setFetchAgainFlag} 
        />, "Info"],
        [<ListsContainer
            listable="features"
            id={feature.id}

        />, "Lists"],
        [<NotesContainer
            id={feature.id}
            notable="features"


        />, "Notes"],
        [<FeatureForm 
            feature={{...feature}}
            handleChange={handleChange}
            togglePublic={togglePublic}
            changeDate={changeDate}
            handleSubmit={handleSubmit}
        />, "Form"]

    ]
    
    const renderContent = (tabsArray, name) => tabsArray.find(tabTuple => tabTuple[1] === name)[0]

    return (
        <Modal
            opened={props.featureModalOpen}
            onClose={() => props.setFeatureModalOpen(false)}
            closeOnClickOutside={false}
            size="full" 
        >
            <DeleteModalConfirmation 
                route={`features/${props.featureId}`}
                successFunction={handleDelete}
                opened={deleteConfirmOpen}
                setOpened={setDeleteConfirmOpen}
                item="Feature"
            />
            <MainContainerHeader 
                title={feature.title}
                handleTabClick={handleTabClick}
                handleEditClick={handleEditFeature}
                tabs={featureShowTabs}
                type="Feature"
                handleDeleteClick={handleDeleteClick}
            />
            <Divider my="xs" />
            {renderContent(featureComponent, featureContent)}
        </Modal>
    )
}
