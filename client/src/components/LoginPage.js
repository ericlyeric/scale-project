import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Form, Button, Image } from 'react-bootstrap';
import Avatar from '../assets/images/avatar.png'
import { useAuthContext } from '../context/AuthContext';
import { login } from '../api/authApi';
import Message from './common/Message';

const style = {
    signIn: {
        width: '100%',
        maxWidth: '330px',
        padding: '15px',
        margin: 'auto',
    },
    circle: {
        border: '5px solid #6c757d',
        height: '150px',
        borderRadius: '50%',
        width: 'auto'
    }
}
const LoginPage = () => {
    const authContext = useAuthContext();
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [message, setMessage] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    let history = useHistory();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        login(formData)
        .then(data => {
            const { isAuthenticated, id, username, weights, message } = data;
            if (isAuthenticated) {
                authContext.setUser({
                    id,
                    username,
                    weights
                });
                authContext.setIsAuth(isAuthenticated);
                history.push('/');
            } else {
                setMessage(message);
            }
        });
        setSubmitting(false);
    };

    return(
        <Container>
            <Form className="py-5" style={style.signIn} onSubmit={handleSubmit} >
                <Container className="pb-3">
                    <Image className="mx-auto d-block" style={style.circle} src={Avatar} width="50%" height="auto" roundedCircle />
                </Container>
                <Form.Group>
                    <Form.Control className="mb-2" style={style.username} type="text" name="username" onChange={handleChange} placeholder="Username" required/>
                    <Form.Control style={style.password} type="password" name="password" onChange={handleChange} placeholder="Password" required/>
                </Form.Group>
                <Button className="btn btn-lg btn-secondary btn-block" variant="primary" type="submit">
                    {submitting ? 'Signing in...' : 'Sign in'}
                </Button>
            </Form>
            { message ? <Message message={message} /> : null}
        </Container>
    )
}

export default LoginPage;