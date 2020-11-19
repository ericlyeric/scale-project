import React, { createContext, useState, useEffect, useMemo, useContext } from 'react';
import { isAuthenticated } from '../api/userApi';
import { Container, Spinner } from 'react-bootstrap';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuth, setIsAuth] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const providerValue = useMemo(() => ({ 
        user, 
        setUser, 
        isAuth, 
        setIsAuth
    }), [user, setUser, isAuth, setIsAuth]);

    useEffect(() => {
        isAuthenticated().then( data => {
            setUser(data.user);
            setIsAuth(data.isAuthenticated);
            setIsLoading(false);
        }) 
    }, []);

    return (
        <>
            {isLoading ? (
                <Container>
                    <Spinner animation="border" /> 
                </Container>
            ): (
                <AuthContext.Provider value={providerValue}>
                    {children}
                </AuthContext.Provider>
            )}
        </>
    )
}

export default AuthProvider;

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error(
            'useAuthContext must be used within the AuthProvider'
        );
    }
    return context;
}