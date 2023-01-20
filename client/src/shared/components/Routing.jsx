import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { history } from '../slices/router';
import Layout from './Layout';
import { locationChange } from '../slices/router';

function Routing() {
    const dispatch = useDispatch();
    // get location
    const location = useSelector(state => state.router.location);

    // get navigate
    const navigate = useNavigate();

    // watch for location change and navigate
    useEffect(() => {
        const unsub = history.listen((nextState) => {
            dispatch(locationChange(nextState))
            navigate(location);
        });
        return unsub;
    }, [navigate, location])
    return (
        <Layout />
    )
}

export default Routing