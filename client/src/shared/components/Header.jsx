import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { requestLogout } from '../slices/auth';
import { currentUserSelector, currentWalletSelector } from '../../selectors/current';
import ChooseWallet from './Wallet/ChooseWallet';
import Alert from '../../components/Alert';
import { NavLink } from 'react-router-dom';

function Header() {
    const dispatch = useDispatch();
    const user = useSelector(currentUserSelector);
    const wallet = useSelector(currentWalletSelector);

    const handleLogout = () => {
        dispatch(requestLogout());
    }
    return (
        <div className="min-h-[50px] px-3 border-b border-slate-200 bg-white">
            <div className="flex justify-between items-center h-full">
                <div className="flex items-center">
                </div>
                <div className='flex items-center gap-4'>
                    {wallet.amount === -1 && (
                        <NavLink to={'/app/accounts/wallets'}>
                            <Alert className='cursor-pointer' type='info' message={'Add Initial Balance to Wallet'} />
                        </NavLink>)}
                    <ChooseWallet />
                    <div
                        className='[ text-sm h-8 w-8 rounded cursor-pointer flex items-center justify-center ]
                    [ bg-slate-200 text-black font-medium transition-all hover:bg-slate-300 ]'
                        onClick={handleLogout}
                    >
                        {user.name.charAt(0).toUpperCase()}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header