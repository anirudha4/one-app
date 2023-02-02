import React, { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom';
import AddTransaction from './Transactions/AddTransaction';

function RouteBasedModals() {
    const [searchParams] = useSearchParams();
    const {
        addTransaction
    } = useMemo(() => {
        const addTransaction = searchParams.get('add_transaction');
        return { addTransaction }
    }, [searchParams]);
    return (
        <>
            {addTransaction && <AddTransaction />}
        </>
    )
}

export default RouteBasedModals