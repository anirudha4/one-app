import React from 'react'
import Alert from '../../components/Alert';

function Insights() {
  return (
    <div className='p-2'>
      <Alert message={<div className='font-semibold'>Insights feature is not included in your plan</div>} />
    </div>
  )
}

export default Insights