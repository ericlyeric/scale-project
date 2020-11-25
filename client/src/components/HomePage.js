import React from 'react';
import { useAuthContext } from '../context/AuthContext';
import HomePagePrivate from './HomePagePrivate';
import HomePagePublic from './HomePagePublic';

const HomePage = () => {
    const { isAuth } = useAuthContext();

    if (isAuth) {
        return (<HomePagePrivate />)
    } 
    return (<HomePagePublic />)
}

export default HomePage;