import React from 'react';
import { Container, Form, Button } from 'react-bootstrap';

const LoginPage = () => {
    return(
        <Container>
            <Form>
                {/* put some image here */}
                <Form.Group>
                    <h1 className>Please Sign In</h1>
                    <Form.Control type="text" placeholder="Username" />
                </Form.Group>
                <Form.Group>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </Container>
    )
}

export default LoginPage;