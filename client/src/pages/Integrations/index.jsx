import React from 'react'
import IntegrationList from '../../components/Integrations/IntegrationList';
import Divider from '../../shared/components/Divider';

function Integrations() {
  return (
    <div className='p-3'>
      <div className="p-4 border border-slate-100 rounded">
        <div className="mb-2 flex items-center">
          <div className="heading-text text-lg text-slate-700 font-medium">
            Integrations
          </div>
        </div>
        <Divider />
        <IntegrationList />
      </div>
    </div>
  )
}

export default Integrations