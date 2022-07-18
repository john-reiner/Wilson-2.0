import React, {useState, useEffect} from 'react'
import { Grid } from '@mantine/core'
import { CircleDashed, Activity, DotsCircleHorizontal, CircleCheck, PlayerPause, PlayerPlay } from 'tabler-icons-react';
import FeatureStatusContainer from './FeatureStatusContainer';


export default function FeatureInfoContainer(props) {

    // const [active, setActive] = useState(1);

    // const statuses = ["created", "working", "ready", "completed", "paused"]

    // useEffect(() => {
    //     let nextStatusIndex = statuses.indexOf(props.feature.status) + 1
    //     console.log(nextStatusIndex)
    //     setActive(nextStatusIndex)
    //     // console.log(statuses.indexOf(props.feature.status))
    //     // if (props.feature.status !== "paused" && active < 4) {
    //     //     setActive(statuses.indexOf(props.feature.status) + 1)
    //     // }
    //     // props.setFeature({...props.feature, 'status': stepperSteps[active][1]})
    //     // props.setUpdateFeatureFlag(true)
    // }, [props.feature.status]);
    
    // // const nextStep = () => {
    // //     setActive((current) => (current <= 3 ? current + 1 : current))
    // //     // props.setFeature({...props.feature, 'status': stepperSteps[active][1]})
    // // };
    
    // const handleNextStatus = (statuses) => {
    //     let nextStatusIndex = statuses.indexOf(props.feature.status) + 1
    //     if (nextStatusIndex < 4) {
    //         return props.setFeature({...props.feature, 'status': statuses[nextStatusIndex]})
    //     }
    //     return props.setFeature({...props.feature, 'status': 'ready'})
    // }

    // const handlePause = () => {
    //     if (props.feature.status !== 'paused') {
    //         props.setFeature({...props.feature, 'status': "paused"})
    //     } else {
    //         props.setFeature({...props.feature, 'status': "working"})
    //     }
    // }
    
    // const stepperSteps = [
    //     [
    //         <Stepper.Step 
    //                 key={0} 
    //                 icon={<CircleDashed size={18} />} 
    //                 label="Created" 
    //                 allowStepSelect={false}

    //             />, 
    //         "created"],
    //         [
    //             <Stepper.Step 
    //                 key={1} 
    //                 icon={<Activity size={18} />} 
    //                 label="Working" 


    //             />, 
    //         "working"],
    //         [
    //             <Stepper.Step key={2} 
    //             icon={<DotsCircleHorizontal size={18} />} 
    //             label="Ready" 

    //             />, 
    //         "ready"],
    //         [<Stepper.Completed key={3}/>, "completed"]
    // ]
        
    // const renderSteps = () => {
    //     return stepperSteps.map(step => {
    //         return step[0]
    //     })
    // }
    
    // const buttonContent = (current, statuses) => {

    //     let currentStatusIndex = statuses.indexOf(current)
    //     let nextStatusIndex = currentStatusIndex + 1
    //     if (nextStatusIndex < 4) {
    //         let nextStatus = statuses[nextStatusIndex]
    //         return nextStatus.charAt(0).toUpperCase() + nextStatus.slice(1)
    //     }
    //     let nextStatus = "ready"
    //     return nextStatus.charAt(0).toUpperCase() + nextStatus.slice(1)
    // }

    return (
        <Grid grow>
            <Grid.Col span={4}>
                <FeatureStatusContainer 
                    status={props.feature.status }
                    setFeature={props.setFeature}
                    feature={props.feature}
                    updateFeature={props.updateFeature}
                />
            </Grid.Col>
            <Grid.Col span={4}>2</Grid.Col>

        </Grid>
        // <Paper
        //     shadow="xs" 
        //     p="sm"
        // >
        //     <Group >

        //         <Stepper 
        //             active={active} 
        //             onStepClick={setActive} 
        //             completedIcon={<CircleCheck />}
        //             breakpoint="sm"
        //         >
        //             {renderSteps()}
        //         </Stepper>
        //         <Button 
        //             onClick={() => handleNextStatus(statuses)}
        //             disabled={props.feature.status === "paused"}
        //         >
        //             Set: {buttonContent(props.feature.status, statuses)}
        //         </Button>
        //     </Group>
        //     <Divider my="xs"/>
        //     <StatusBadge
        //         status={props.feature.status}
        //     />
        // </Paper>
    )
}
