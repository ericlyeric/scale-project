import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Nav, Navbar, Button } from 'react-bootstrap';
import { logout } from '../../api/authApi';
import { useAuthContext } from '../../context/AuthContext';
import '../../styles/NavigationBar.css';

const NavigationBar = () => {
    const { setUser, isAuth, setIsAuth } = useAuthContext();
    const history = useHistory();

    const handleLogout = () => {
        logout().then(data => {
            if (data.success) {
                setUser(data.user);
                setIsAuth(false);
                history.push('/')
            }
        });
    };

    const unauthenticatedNavigationBar = () => {
        return (
            <>
                <Nav.Link as={Link} className="text-light" to="/login">
                    Login 
                </Nav.Link>
                <Nav.Link as={Link} className="text-light" to="/register">
                    Register
                </Nav.Link>
            </>
        );
    }

    const authenticatedNavigationBar = () => {
        return (
            <Button
                variant="dark"
                onClick={handleLogout}
            >
                Logout
            </Button>
        )
    }
    
    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Navbar.Brand href="/">Scale Project</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse>
            <Nav className="mr-auto">

                { !isAuth ? unauthenticatedNavigationBar() : authenticatedNavigationBar() }
            </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default NavigationBar;