import React, { useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import { useAuthContext } from '../context/AuthContext';
import HomePagePrivate from './HomePagePrivate';
import HomePagePublic from './HomePagePublic';

const HomePage = () => {
    const { isAuth, user, isLoading } = useAuthContext();

    if (isLoading) {
        return <Spinner />
    }

    return (
        <>
            {isAuth && user !== undefined ? <HomePagePrivate user={user} /> :
                <HomePagePublic />
            }
        </>
    )
}

export default HomePage;