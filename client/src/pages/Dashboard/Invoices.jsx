import React from 'react'
import Alert from '../../components/Alert'

function Invoices() {
  return (
    <div className='p-2'>
      <Alert message={<div className='font-semibold'>Invoices feature is not included in your plan</div>} />
    </div>
  )
}

export default Invoices