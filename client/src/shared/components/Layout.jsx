import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar';

function Layout() {
    const { isCoreInitializing } = useSelector(state => state.core);
    if (isCoreInitializing) {
        return <div>Loading</div>
    }
    return (
        <div className='h-screen'>
            {/* <Navbar /> */}
            <main>
                <Outlet />
            </main>
        </div>
    )
}

export default Layout