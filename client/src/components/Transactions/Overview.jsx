import React from 'react'
import Divider from '../../shared/components/Divider';
import OverviewSlot from './OverviewSlot';
import styles from './styles.module.css';

function TransactionOverview() {
    return (
        <div className='transactions-overview p-5 bg-white h-full max-w-[500px] rounded'>
            <div className="heading-text text-slate-700 text-lg font-medium mb-2">Overview</div>
            <Divider />
            <div className='flex gap-4 w-full'>
                <OverviewSlot />
            </div>
        </div>
    )
}

export default TransactionOverview