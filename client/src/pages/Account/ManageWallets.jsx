import React from 'react'
import { useSelector } from 'react-redux';
import Alert from '../../components/Alert';
import { currentWalletSelector } from '../../selectors/current';

function ManageWallets() {
  const wallet = useSelector(currentWalletSelector);
  return (
    <div className='p-2'>
      <div className="card p-3">
        <div className="heading-text">
          
        </div>
      </div>
    </div>
  )
}

export default ManageWallets