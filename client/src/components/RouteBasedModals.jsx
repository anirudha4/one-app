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
        switchWorkspace
    } = useMemo(() => {
        const addTransaction = searchParams.get('add_transaction');
        const addMember = searchParams.get('add_member');
        const switchWorkspace = searchParams.get('switch_workspace');
        return { addTransaction, addMember, switchWorkspace }
    }, [searchParams]);
    return (
        <>
            {addTransaction && <AddTransaction />}
            {addMember && <AddMember />}
            {switchWorkspace && <SwitchWorkspace />}
        </>
    )
}

export default RouteBasedModals