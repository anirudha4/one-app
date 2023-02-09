import React from 'react'
import { Outlet } from 'react-router-dom'
import AccountHeader from './AccountHeader'

function AccountLayout() {
  return (
    <div className='py-3'>
      <AccountHeader />
      <br />
      <Outlet />
    </div>
  )
}

export default AccountLayout