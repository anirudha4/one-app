import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'

function Layout() {
    const { isCoreInitializing } = useSelector(state => state.core);
    if (isCoreInitializing) {
        return (
            <div className='h-screen flex flex-col items-center justify-center gap-4'>
                <div className="loader ease-linear rounded-full border border-t border-gray-200 h-[40px] w-[40px]"></div>
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