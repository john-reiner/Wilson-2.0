import React, {useState} from 'react'
import ProjectTab from './ProjectTab';
import Info from './Tabs/Info';
import Features from './Tabs/Features';
import Col from 'react-bootstrap/Col'




export default function Project(props) {

    const [projectTabIndex, setProjectTabIndex] = useState(0);

    let tabComponents = [
        <Info tabName="Info" />,
        <Features tabName="Features"/>        
    ]

    const renderContent = (tabsArray, index) => tabsArray[index]

    const handleTabClick = (index) => {
        setProjectTabIndex(index)
    }

    const renderTabs = (tabsArray) => {
        let keyNum = -1
        return tabsArray.map(tab => {
            keyNum ++
            return <ProjectTab 
                    name={tab.props.tabName} 
                    handleTabClick={handleTabClick}
                    projectTabIndex={projectTabIndex}
                    index={tabComponents.indexOf(tab)}
                    key={keyNum}
                    />
        })
    }

    return (
        <Col>
            <div className="project-container">
                <div className="project-nav">
                    <ul className="project-nav-list">
                        {renderTabs(tabComponents)}
                    </ul>
                </div>
                <div className="project-body">
                    {renderContent(tabComponents, projectTabIndex)}
                    <div className="show-button" onClick={() => props.setViewToShow(2)}>Show</div>
                </div>
            </div>

        </Col>
    )
}
