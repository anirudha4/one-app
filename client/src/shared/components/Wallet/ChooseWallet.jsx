import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { IoWalletOutline } from 'react-icons/io5';
import { currentWalletSelector } from '../../../selectors/current'
import { NavLink } from 'react-router-dom';
function ChooseWallet() {
    const wallet = useSelector(currentWalletSelector);
    const [showBalance, setShowBalance] = useState(false);
    const toggleWalletBalance = () => {
        setShowBalance(true);
        setTimeout(() => {
            setShowBalance(false);
        }, [2000])
    }
    return (
        <div
            title={`${wallet.name} Wallet`}
            className='
                    h-8 rounded border border-slate-200 flex items-center gap-2
                    hover:bg-slate-100
            '>
            <NavLink to={'/app/accounts/wallets'}>
                <span className="text-xs px-3 font-semibold text-slate-800">
                    {wallet.name}
                </span>
            </NavLink>
            <span
                className='px-3 border-l border-slate-200 text-xs font-semibold cursor-pointer'
                onClick={toggleWalletBalance}
            >
                {showBalance ? `Rs. ${wallet.amount}` : <IoWalletOutline />}
            </span>
        </div>
    )
}

export default ChooseWallet