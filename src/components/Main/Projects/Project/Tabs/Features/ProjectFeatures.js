import React from 'react'
import Feature from './Feature'

export default function Features(props) {

    console.log(props.features)

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
                <p>No Projects</p>
            )
        }
    }

    return (
        <div>
            <div id="new-feature-button">New Feature</div>
            {renderFeatures()}
        </div>
    )
}
