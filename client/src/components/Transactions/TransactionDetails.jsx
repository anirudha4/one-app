import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { Helmet } from "react-helmet";
import { transactionByIdSelector } from '../../selectors/by-id';
import SidepanelWrapper from '../../shared/components/SidepanelWrapper';

function TransactionDetails({ id }) {
    const { name, description, type, amount, date, transactionTags } = useSelector(state => transactionByIdSelector(state, id));

    if (!name) {
        return <Navigate to={'/app/transactions'} />
    }
    return (
        <SidepanelWrapper title={name} back={'/app/transactions'}>
            <Helmet>
                <title>{name}</title>
            </Helmet>
            <div className="flex flex-col gap-3 mt-3">
                <div className="p-2 text-xs bg-slate-50 rounded text-slate-700 font-medium transition-all hover:bg-slate-100">
                    {description || 'No Description'}
                </div>
                {/* categories */}

                {/* tags */}
            </div>
        </SidepanelWrapper>
    )
}

export default TransactionDetails