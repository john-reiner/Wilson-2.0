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
                            <Col sm={4}>
                                <h1 id="landing-heading"> <span className="text-secondary" id="wilson-text">Wilson</span> is your project management HQ</h1>
                            </Col>      
                            <Col sm={8}>
                                <h2>A project management app built for individuals and small teams.</h2>
                                <Button variant="dark" id="landing-button" onClick={() => props.setAppComponent("signup")}>Get Started</Button>{' '}
                            </Col>              
                        </Row>

                    </Col>
                </Row>

            </Container>
        </Container>
    )
}
