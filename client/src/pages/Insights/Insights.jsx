import React from 'react'
import { Helmet } from 'react-helmet';
import Alert from '../../components/Alert';

function Insights() {
  return (
    <div className='p-2'>
      <Helmet>
        <title>One App | Insights</title>
      </Helmet>
      <Alert message={<div className='font-semibold'>Insights feature is not included in your plan</div>} />
    </div>
  )
}

export default Insights