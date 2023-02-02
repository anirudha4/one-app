import React from 'react'
import { Outlet } from 'react-router-dom'
import RouteBasedModals from '../../components/RouteBasedModals'
import withGaurd from '../hoc/withGaurd'
import Header from './Header'
import Sidebar from './Sidebar'

function AppLayout() {
    return (
        <div className='app-layout h-screen w-full bg-slate-50 shadow-lg'>
            <Sidebar />
            <main className='h-full flex flex-col'>
                <Header />
                <Outlet />
            </main>
            <RouteBasedModals />
        </div>
    )
}

export default withGaurd(AppLayout);