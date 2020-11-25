import React from 'react';
import { Alert } from 'react-bootstrap';

const style = {
    width: '100%',
    maxWidth: '330px',
    padding: '15px',
    margin: 'auto',
}

const getStyle = (message) => {
    if (message.error) {
        return 'danger';
    } else {
        return 'success';
    }
};

const Message = ({ message }) => {
    return (
        <Alert style={style} variant={getStyle(message)}>
            {message.body}
        </Alert>
    );
};

export default Message;