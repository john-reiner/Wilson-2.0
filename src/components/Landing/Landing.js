import React from 'react'
import './Landing.css';

export default function Landing(props) {

    return (
        <div id="landing-container" fluid>
            <div>
                <div>
                    <div>
                        <div className="mt-5">
                            <div id="landing-image-container" sm={4}>
                                <img id="landing-image" src="landing.svg" alt="landing"/>
                            </div>      
                            <div id="landing-heading-container" sm={8}>
                                <div id="landing-heading">
                                    <h1><span id="wilson-text">Wilson</span></h1>
                                    <h2>Your project management HQ</h2>
                                    <div className="primary-button-one" onClick={() => props.setAppComponent("signup")}>Get Started</div>
                                </div>
                            </div>              
                        </div>

                    </div>
                </div>

            </div>
        </div>
    )
}
