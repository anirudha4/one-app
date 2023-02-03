import React from 'react'
import Divider from '../../shared/components/Divider';
import OverviewSlot from './OverviewSlot';

function TransactionOverview() {
    return (
        <div className='transactions-overview p-5 card h-fit'>
            <div className="heading-text text-slate-700 text-lg font-medium mb-2">Overview</div>
            <Divider />
            <div className='flex gap-4 w-full'>
                <OverviewSlot />
            </div>
        </div>
    )
}

export default TransactionOverview