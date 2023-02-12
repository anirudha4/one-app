import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, useParams } from 'react-router-dom';
import { transactionByIdSelector } from '../../selectors/by-id';
import SidepanelWrapper from '../../shared/components/SidepanelWrapper';

function TransactionDetails({ id }) {
    const { name, type, amount, date, transactionTags } = useSelector(state => transactionByIdSelector(state, id));

    if(!name) {
        return <Navigate to={'/app/transactions'} />
    }
    return (
        <SidepanelWrapper title={name} back={'/app/transactions'}>

        </SidepanelWrapper>
    )
}

export default TransactionDetails