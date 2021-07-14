import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import context from '../context/context';
import Spinner from './Spinner';

const PrivateRoute = ({ component: Component, ...rest }) => {
    
    const { loggedInUser, loading } = useContext(context);

    return (
        <>
        {   
            loading?
            <Spinner />
            :<Route 
                { ...rest }
                render={({ location })=>
                    loggedInUser.email ? (
                        <Component />
                    ) : (
                        <Redirect
                        to={{
                            pathname: '/login',
                            state: { from: location }
                        }}
                        />
                    )
                }
            />
        }
        </>
    );
};

export default PrivateRoute;