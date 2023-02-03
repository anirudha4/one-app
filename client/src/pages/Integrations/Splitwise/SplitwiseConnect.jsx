import React from 'react'
import { TbArrowLeft } from 'react-icons/tb'
import { Link } from 'react-router-dom'
import Divider from '../../../shared/components/Divider'

function SplitwiseConnect() {
  return (
    <div className='p-3'>
      <div className="p-4 border bg-white border-slate-100 rounded">
        <div className="mb-2 flex items-center">
          <div className="flex items-center gap-3">
            <Link to={'/app/integrations'}>
              <div className="h-6 w-6 border border-slate-900 text-black flex items-center justify-center rounded-full cursor-pointer">
                <TbArrowLeft />
              </div>
            </Link>
            <div className="heading-text text-lg text-slate-700 font-medium">
              Splitwise Integration
            </div>
          </div>
        </div>
        <Divider />

        
      </div>
    </div>
  )
}

export default SplitwiseConnect