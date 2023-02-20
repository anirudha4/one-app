import React from 'react'
import { Helmet } from 'react-helmet'
import Alert from '../../components/Alert'

function Invoices() {
  return (
    <div className='p-2'>
      <Helmet>
        <title>One App | Invoices</title>
      </Helmet>
      <Alert message={<div className='font-semibold'>Invoices feature is not included in your plan</div>} />
    </div>
  )
}

export default Invoices