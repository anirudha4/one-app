import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import Loader from './Loader';

function Layout() {
    const { isCoreInitializing } = useSelector(state => state.core);
    if (isCoreInitializing) {
        return (
            <div className='h-screen flex flex-col items-center justify-center gap-4'>
                <Loader size={40} />
                <p className="font-semibold heading-text">
                    Loading...
                </p>
            </div>
        )
    }
    return (
        <div className='h-screen'>
            <main>
                <Outlet />
            </main>
        </div>
    )
}

export default Layout