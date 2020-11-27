import React from 'react';
import { Jumbotron, Container } from 'react-bootstrap';

const HomePagePublic = () => {
    return (
        <Jumbotron fluid>
            <Container>
                <h1>Scale Project</h1>
                <p>
                    The application is used to track your weight daily, and chart the progress you've made. Good luck!
                </p>
            </Container>
        </Jumbotron>
    )
}

export default HomePagePublic;