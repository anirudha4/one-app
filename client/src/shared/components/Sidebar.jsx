import { useMemo } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux'
import { currentOrganizationSelector } from '../../selectors/current'

// icons
import { TbListCheck, TbSelector } from 'react-icons/tb';
import { BsAppIndicator } from 'react-icons/bs';
import { AiOutlineCreditCard } from 'react-icons/ai';
import { RiHome5Line, RiNewspaperLine } from 'react-icons/ri';

function Sidebar() {
    // selectors
    const organization = useSelector(currentOrganizationSelector);

    const NAVBAR_LINKS = useMemo(() => {
        return [
            { id: 1, label: 'Home', route: '/', icon: <RiHome5Line size={18} /> },
            { id: 2, label: 'Transactions', route: '/app/transactions', icon: <AiOutlineCreditCard size={18} /> },
            { id: 3, label: 'Invoices', route: '/app/invoices', icon: <RiNewspaperLine size={18} /> },
            { id: 4, label: 'Tasks', route: '/app/tasks', icon: <TbListCheck size={18} /> },
            { id: 5, label: 'Integrations', route: '/app/integrations', icon: <BsAppIndicator size={18} /> },
        ]
    }, [])
    return (
        <div className="sidebar bg-white">
            <div className="workspace p-2 h-[50px] items-center cursor-pointer border-b border-slate-200 transition-all hover:bg-slate-200">
                <div className="flex items-center gap-2 truncate">
                    <div className="avatar h-6 w-6 bg-black rounded flex items-center justify-center">
                        <div className="avatar-initial text-xs font-medium text-gray-100">{organization.name.charAt(0).toUpperCase()}</div>
                    </div>
                    <div className="workspace-name text-xs font-medium truncate w-full flex-1 text-black">{organization.name}</div>
                </div>
                <div className="workspace-select-icon min-w-[20px] min-h-[20px]">
                    <TbSelector size={18} className='text-slate-500' />
                </div>
            </div>
            <div className='p-2 mt-2 relative'>
                <input type="text" className="input shadow border-none w-full" placeholder='Search Transactions' />
            </div>
            <div className="links flex flex-col mt-2 gap-2 p-3">
                {NAVBAR_LINKS.map(NAV_LINK => {
                    return (
                        <NavLink key={NAV_LINK.id} to={NAV_LINK.route} className={({ isActive }) => isActive ? 'p-2 font-medium text-sm rounded flex items-center gap-2 bg-black text-white' : 'p-2 rounded flex items-center gap-2 hover:bg-slate-200 transition-all duration-75'}>
                            <div className="nav-icon min-w-[18px] min-h-[18px] flex items-center justify-center">
                                {NAV_LINK.icon}
                            </div>
                            <div className="nav-label font-medium text-xs">
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