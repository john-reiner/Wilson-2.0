import React, {useState} from 'react'
import Feature from './Feature'
import NewFeature from './NewFeature';

export default function Features(props) {

    const [newFeatureFormShow, setNewFeatureFormShow] = useState(false);

    const renderFeatures = () => {
        if (props.features.length > 0) {
            return props.features.map(feature => {
                return <Feature 
                            title={feature.title}
                            description={feature.description}
                            dueDate={feature.due_date}
                            public={feature.public}
                        />
            })
        } else {
            return (
                <p>No Features</p>
            )
        }
    }

    return (
        <div>
            {!newFeatureFormShow && <div id="new-feature-button" onClick={() => setNewFeatureFormShow(true)}>New Feature</div>}
            {newFeatureFormShow ? <NewFeature setFetchAgainFlag={props.setFetchAgainFlag} projectId={props.projectId} userId={props.userId} setNewFeatureFormShow={setNewFeatureFormShow} /> : renderFeatures()}
        </div>
    )
}
