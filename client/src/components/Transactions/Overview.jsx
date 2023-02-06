import classNames from 'classnames';
import React from 'react'
import Divider from '../../shared/components/Divider';
import OverviewSlot from './OverviewSlot';

function TransactionOverview({ expanded }) {
    return (
        <div className={classNames('transactions-overview p-5 card h-fit transition-all duration-150', {
            'orientation-slant': expanded
        })}>
            <div className="heading-text text-slate-700 text-lg font-medium mb-2">Overview</div>
            {!expanded && (
                <>
                    <Divider />
                    <div className='flex gap-4 w-full'>
                        <OverviewSlot />
                    </div>
                </>
            )
            }
        </div>
    )
}

export default TransactionOverview