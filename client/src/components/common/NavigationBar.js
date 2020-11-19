import React from 'react';
import { Link } from 'react-router-dom';
import { Nav, Navbar } from 'react-bootstrap';

const NavigationBar = () => {
    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            {/* put a troll logo */}
            <Navbar.Brand href="/">Scale Project</Navbar.Brand>
            <Nav className="mr-auto">
                <Nav.Link>
                    <Link className="text-light" to="/login">Login</Link>
                </Nav.Link>
                <Nav.Link>
                    <Link className="text-light" to="/register">Register</Link>
                </Nav.Link>
            </Nav>
        </Navbar>
    )
}

export default NavigationBar;