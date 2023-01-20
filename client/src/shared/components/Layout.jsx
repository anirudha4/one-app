import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar';

function Layout() {
    const isCoreInitializing = useSelector(state => state.core.isCoreInitializing);
    if (isCoreInitializing) {
        return <div>Loading</div>
    }
    return (
        <div className="root-layout">
            <Navbar />
            <main className='main-container'>
                <Outlet />
            </main>
        </div>
    )
}

export default Layout