import React from 'react';
import { Alert } from 'react-bootstrap';

const getStyle = (message) => {
    if (message.error) {
        return 'error';
    } else {
        return 'success';
    }
};

const Message = ({ message }) => {
    return (
        <Alert variant={getStyle(message)}>
            {message.body}
        </Alert>
    );
};

export default Message;