import React from 'react'
import './Landing.scss';
import { Container, Stack, Row, Col, Button } from 'react-bootstrap'

export default function Landing(props) {

    return (
        <div>
            
            <Container variant="primary" id="landing-container" fluid>
                <Row>
                    <Col >
                        <Stack gap={4}>
                            <h1 className="display-1 text-secondary text-center" id="wilson-text">Wilson</h1>
                            <h2 className="text-white text-center">A project management app built for individuals and small teams.</h2>
                            <Button variant="dark" id="landing-button" onClick={() => props.setComponentIndex(1)}>Get Started</Button>{' '}
                        </Stack>

                    </Col>
                </Row>
            </Container>
        </div>
    )
}
