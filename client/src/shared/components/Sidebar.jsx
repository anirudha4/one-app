import { useMemo } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux'
import { currentOrganizationSelector } from '../../selectors/current'

// icons
import { BsAppIndicator } from 'react-icons/bs';
import { AiOutlineCreditCard } from 'react-icons/ai';
import { RiHome5Line, RiNewspaperLine } from 'react-icons/ri';
import WorkspaceSelector from './WorkspaceSelect';

function Sidebar() {
    // selectors
    const organization = useSelector(currentOrganizationSelector);

    const NAVBAR_LINKS = useMemo(() => {
        return [
            { id: 1, label: 'Home', route: '/', icon: <RiHome5Line size={18} /> },
            { id: 2, label: 'Transactions', route: '/app/transactions', icon: <AiOutlineCreditCard size={18} /> },
            { id: 3, label: 'Invoices', route: '/app/invoices', icon: <RiNewspaperLine size={18} /> },
            { id: 4, label: 'Integrations', route: '/app/integrations', icon: <BsAppIndicator size={18} /> },
        ]
    }, [])
    return (
        <div className="sidebar bg-white">
            <WorkspaceSelector {...organization} />
            <div className='p-2 mt-2 relative'>
                <input type="text" className="input shadow border-none w-full" placeholder='Search Transactions' />
            </div>
            <div className="links flex flex-col mt-2 gap-2">
                {NAVBAR_LINKS.map(NAV_LINK => {
                    return (
                        <NavLink key={NAV_LINK.id} to={NAV_LINK.route} className={({ isActive }) => `
                            p-2 border-r-2 border-transparent flex items-center gap-2
                            font-medium text-slate-700
                            hover:bg-slate-100
                            ${isActive && 'border-slate-500 text-black bg-slate-50'}
                        `}>
                            <div className="nav-icon min-w-[18px] min-h-[18px] flex items-center justify-center">
                                {NAV_LINK.icon}
                            </div>
                            <div className="nav-label text-xs">
                                {NAV_LINK.label}
                            </div>
                        </NavLink>
                    )
                })}
            </div>
        </div>
    )
}

export default Sidebar