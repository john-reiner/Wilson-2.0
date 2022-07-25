import React from 'react'
import { Button, Group } from '@mantine/core';
import { Plus } from 'tabler-icons-react';

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
        </Group>
    )
}
