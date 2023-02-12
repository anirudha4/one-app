import React, { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom';
import AddMember from './Members/AddMember';
import AddTransaction from './Transactions/AddTransaction';
import SwitchWorkspace from './Workspace/SwitchWorkspace';

function RouteBasedModals() {
    const [searchParams] = useSearchParams();
    const {
        addTransaction,
        addMember,
        switchWorkspace,
        showTransaction
    } = useMemo(() => {
        const addTransaction = searchParams.get('add_transaction');
        const addMember = searchParams.get('add_member');
        const switchWorkspace = searchParams.get('switch_workspace');
        const showTransaction = searchParams.get('show_transaction');
        return { addTransaction, addMember, switchWorkspace, showTransaction };
    }, [searchParams]);
    return (
        <>
            {addTransaction && <AddTransaction />}
            {addMember && <AddMember />}
            {switchWorkspace && <SwitchWorkspace />}
            {showTransaction && <></>}
        </>
    )
}

export default RouteBasedModals