import React from 'react'
import { useSelector } from 'react-redux'
import { IoWalletOutline } from 'react-icons/io5';
import { currentWalletSelector } from '../../../selectors/current'
function ChooseWallet() {
    const wallet = useSelector(currentWalletSelector);
    return (
        <div
            title={`${wallet.name} Wallet`}
            className='
            h-8 rounded border border-slate-200 flex items-center gap-2
            hover:bg-slate-100
        '>
            <span className="text-xs px-3 font-semibold text-slate-800">
                {wallet.name}
            </span>
            <span className='px-3 border-l border-slate-200'>
                <IoWalletOutline />
            </span>
        </div>
    )
}

export default ChooseWallet