import React from 'react';
import { useAuthContext } from '../context/AuthContext';
import HomePagePrivate from './HomePagePrivate';
import HomePagePublic from './HomePagePublic';

const HomePage = () => {
    const { isAuth, user } = useAuthContext();

    if (isAuth && user !== undefined) {
        return (<HomePagePrivate user={user}/>)
    } 
    return (<HomePagePublic />)
}

export default HomePage;