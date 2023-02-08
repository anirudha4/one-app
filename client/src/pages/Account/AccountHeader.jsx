import classNames from 'classnames';
import React from 'react'
import { HiOutlineUser } from 'react-icons/hi';
import { BiCategoryAlt } from 'react-icons/bi';
import { IoWalletOutline } from 'react-icons/io5';
import { NavLink } from 'react-router-dom';

const TAB_OPTIONS = [
    { id: 1, label: 'Profile', route: '/app/accounts/profile', icon: <HiOutlineUser size={16} /> },
    { id: 2, label: 'Manage Categories', route: '/app/accounts/categories', icon: <BiCategoryAlt size={16} /> },
    { id: 3, label: 'Manage Wallets', route: '/app/accounts/wallets', icon: <IoWalletOutline size={16} /> },
];

function AccountHeader() {
    return (
        <div>
            <HorizontalTabs />
        </div>
    )
}

export default AccountHeader

const HorizontalTabs = () => {
    return (
        <div className="flex items-center border-b">
            {TAB_OPTIONS.map(tabOption => {
                return (
                    <NavLink className={({ isActive }) => `
                    px-4 h-8 border-b border-transparent flex items-center gap-2
                    font-medium text-slate-600 transition duration-100 text-xs
                    hover:bg-slate-100
                    ${isActive && 'border-slate-800 text-black bg-slate-100 rounded-t'}
                `} key={tabOption.id} to={tabOption.route}>
                    {tabOption.icon}
                    <span>
                        {tabOption.label}
                    </span>
                    </NavLink>
                )
            })}
        </div>
    )
}