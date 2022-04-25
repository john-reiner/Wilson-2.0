import React from 'react'
import './Landing.scss';
import { Container, Stack, Row, Col, Button } from 'react-bootstrap'

export default function Landing(props) {

    return (
        <Container id="landing-container" fluid>
            <Container>
                <Row>
                    <Col>
                        <Row className="mt-5">
                            <Col id="landing-image-container" sm={4}>
                                <img id="landing-image" src="landing.svg" alt="landing"/>
                            </Col>      
                            <Col id="landing-heading-container" sm={8}>
                                <div id="landing-heading">
                                    <h1><span id="wilson-text">Wilson</span></h1>
                                    <h2>Your project management HQ</h2>
                                    <div className="primary-button-one" onClick={() => props.setAppComponent("signup")}>Get Started</div>
                                </div>
                            </Col>              
                        </Row>

                    </Col>
                </Row>

            </Container>
        </Container>
    )
}
