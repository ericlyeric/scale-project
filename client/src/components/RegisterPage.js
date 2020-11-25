import React, { useEffect, useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Form, Button, Image } from 'react-bootstrap';
import Message from './common/Message';
import Avatar from '../assets/images/avatar2.jpeg'
import { register } from '../api/authApi';

const style = {
    signIn: {
        width: '100%',
        maxWidth: '330px',
        padding: '15px',
        margin: 'auto',
    },
    circle: {
        border: '5px solid #6c757d',
        width: '150px',
        borderRadius: '50%',
        height: '150px',
        objectFit: 'cover'
    }
}

const RegisterPage = () => {
    const history = useHistory();

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    })
    const [message, setMessage] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    let timerId = useRef(null);

    useEffect(() => {
        return () => {
            clearTimeout(timerId);
        }
    })

    const handleChange = (event) => {
        const { name, value } = event.target; 
        setFormData({
            ...formData,
            [name]: value
        })
    };
    
    const resetForm = () => {
        setFormData({
            username: '',
            email: '',
            password: ''
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        register(formData).then(data => {
            setSubmitting(true);
            const { message } = data;
            setMessage(message);
            resetForm();
            if (!message.error) {
                timerId = setTimeout(() => {
                    history.push('/login');
                }, 2000);
            } else {
                setSubmitting(false);
            }
        })
    }

    return (
        <Container>
            <Form className="py-5" style={style.signIn} onSubmit={handleSubmit} >
                <Container className="pb-3">
                    <Image className="mx-auto d-block" style={style.circle} src={Avatar} width="50%" height="auto" roundedCircle />
                </Container>
                <Form.Group>
                    <Form.Control className="mb-2" style={style.email} type="email" name="email" onChange={handleChange} placeholder="Email" required/>
                    <Form.Control className="mb-2" style={style.username} type="text" name="username" onChange={handleChange} placeholder="Username" required/>
                    <Form.Control style={style.password} type="password" name="password" onChange={handleChange} placeholder="Password" required/>
                </Form.Group>
                <Button className="btn btn-lg btn-secondary btn-block" variant="primary" type="submit">
                    {submitting ? 'Registering...' : 'Register'}
                </Button>
            </Form>
            { message ? <Message message={message} /> : null}
        </Container>
    )
}

export default RegisterPage;