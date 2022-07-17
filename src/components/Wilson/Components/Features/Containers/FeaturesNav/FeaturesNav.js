import React from 'react'
import { Button, Group, Title } from '@mantine/core';
import { Plus, ListSearch } from 'tabler-icons-react';

export default function FeaturesNav(props) {


    return (
        <Group
            position='apart'
        >
            <Button 
                leftIcon={<Plus size={14} />}
                onClick={() => props.setNewFeatureModalOpen(true)}
            >
                New Feature
            </Button>
            <Title>Features</Title>
            <Button 
                leftIcon={<ListSearch size={14} />}
                onClick={() => props.setShowFeaturesSelect(true)}
                color='green'
                variant={props.showFeaturesSelect ? "outline" : "filled"}
            >
                Select a Feature
            </Button>
        </Group>
    )
}
