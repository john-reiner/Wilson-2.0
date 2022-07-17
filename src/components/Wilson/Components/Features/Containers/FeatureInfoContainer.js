import React, {useState, useEffect} from 'react'
import { Stepper, Paper, Group, ActionIcon, Button, Divider } from '@mantine/core'
import { CircleDashed, Activity, DotsCircleHorizontal, CircleCheck, PlayerPause, PlayerPlay } from 'tabler-icons-react';
import StatusBadge from '../Components/StatusBadge';


export default function FeatureInfoContainer(props) {

    const [active, setActive] = useState(0);

    useEffect(() => {
        props.setFeature({...props.feature, 'status': stepperSteps[active][1]})
        props.setUpdateFeatureFlag(true)
    }, [active]);

    const nextStep = () => setActive((current) => (current < 4 ? current + 1 : current));
    const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

    const handlePause = () => {
        if (props.feature.status !== 'paused') {
            props.setFeature({...props.feature, 'status': "paused"})
            props.setUpdateFeatureFlag(true)
        } else {
            props.setFeature({...props.feature, 'status': stepperSteps[active][1]})
            props.setUpdateFeatureFlag(true)
        }
    }

    const stepperSteps = 
        [
            [
                <Stepper.Step 
                    key={0} 
                    icon={<CircleDashed size={18} />} 
                    label="Created" 
                    allowStepSelect={active > 0} 

                />, 
            "created"],
            [
                <Stepper.Step 
                    key={1} 
                    icon={<Activity size={18} />} 
                    label="Working" 
                    allowStepSelect={active > 1} 

                />, 
            "working"],
            [
                <Stepper.Step key={2} 
                icon={<DotsCircleHorizontal size={18} />} 
                label="Ready" 
                allowStepSelect={active > 2} 

                />, 
            "ready"],
            [
                <Stepper.Step 
                    key={3} 
                    icon={<CircleCheck size={18} />} 
                    label="Completed" 
                    allowStepSelect={active > 3} 

                    />, 
            "completed"],
            [<Stepper.Completed />]
        ]

    const renderSteps = () => {
        return stepperSteps.map(step => {
            return step[0]
        })
    }

    return (
        <Paper
            shadow="xs" 
            p="sm"
        >
            <Group position='apart'>
                <ActionIcon 
                    size="xl" 
                    variant={!(props.feature.status === 'paused') ? "outline" : "filled"}
                    color={props.feature.status === 'paused' && "green"}
                    onClick={handlePause}
                >
                    {props.feature.status === 'paused' ? <PlayerPlay /> : <PlayerPause />}
                </ActionIcon>
                <Stepper 
                    active={active} 
                    onStepClick={setActive} 
                    completedIcon={<CircleCheck />}
                    breakpoint="sm"
                >
                    {renderSteps()}
                </Stepper>
                {/* <Button variant="default" onClick={prevStep}>Back</Button> */}
                <Button onClick={nextStep}>Next step</Button>
            </Group>
            <Divider my="xs"/>
            <StatusBadge
                status={props.feature.status}
            />
        </Paper>
    )
}
