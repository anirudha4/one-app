import React, { useMemo } from 'react'
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import AddMember from './Members/AddMember';
import FilterSheet from './Transactions/FilterSheet';
import AddTransaction from './Transactions/AddTransaction';
import SwitchWorkspace from './Workspace/SwitchWorkspace';

function RouteBasedModals() {
    const [searchParams] = useSearchParams();
    const { showFilterPopup } = useSelector(state => state.core);
    const {
        addTransaction,
        addMember,
        switchWorkspace,
    } = useMemo(() => {
        const addTransaction = searchParams.get('add_transaction');
        const addMember = searchParams.get('add_member');
        const switchWorkspace = searchParams.get('switch_workspace');
        return { addTransaction, addMember, switchWorkspace };
    }, [searchParams]);
    return (
        <>
            {addTransaction && <AddTransaction />}
            {addMember && <AddMember />}
            {switchWorkspace && <SwitchWorkspace />}
            {showFilterPopup && <FilterSheet />}
        </>
    )
}

export default RouteBasedModals