import React from 'react'
import { TbX } from 'react-icons/tb';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { allOrganizationSelector } from '../../selectors/all';
import { currentOrganizationSelector } from '../../selectors/current';
import Divider from '../../shared/components/Divider';


function SwitchWorkspace() {
    const workspaces = useSelector(allOrganizationSelector);
    const currentOrganization = useSelector(currentOrganizationSelector);
    return (
        <div className='add-member-modal-container flex items-center justify-center'>
            <Link to={'/app/transactions'}>
                <div className="fixed top-0 left-0 w-full h-screen bg-black opacity-40 z-10"></div>
            </Link>
            <div className="fixed z-20 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rounded add-transaction-card p-4 bg-white max-w-[500px] w-full transition-all duration-75">
                <div className="mb-2 flex items-center justify-between">
                    <div className="heading-text text-slate-700 text-lg font-medium">Workspaces</div>
                    <Link replace to={'/app/transactions'} className="h-7 w-7 bg-slate-100 flex items-center justify-center rounded-md hover:bg-slate-200 cursor-pointer transition-all">
                        <TbX className='text-slate-600' />
                    </Link>
                </div>
                <Divider />
                <div className="grid grid-cols-2 gap-2">
                    {workspaces.map(workspace => {
                        return (
                            <div className="card flex items-center text-xs p-2 gap-3 hover:bg-slate-50 cursor-pointer font-medium">
                                <div className="h-6 w-6 flex items-center justify-center text-white bg-black rounded">
                                    {workspace.name.charAt(0).toUpperCase()}
                                </div>
                                <span>
                                    {workspace.name}
                                </span>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default SwitchWorkspace