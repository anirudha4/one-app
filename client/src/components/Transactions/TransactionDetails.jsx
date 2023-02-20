import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { Helmet } from "react-helmet";
import { transactionByIdSelector } from '../../selectors/by-id';
import SidepanelWrapper from '../../shared/components/SidepanelWrapper';
import { formatDate } from '../../utils';
import { TbTrash } from 'react-icons/tb';
import { deleteTransactionAction } from '../../shared/actions/entry/transactions';

function TransactionDetails({ id }) {
    const { name, description, type, amount, date, category, splitwiseTransaction, transactionTags, transactionFriends } = useSelector(state => transactionByIdSelector(state, id));

    // dispatch
    const dispatch = useDispatch();

    // handlers
    const handleDelete = () => dispatch(deleteTransactionAction({ id }));

    if (!name) {
        return <Navigate to={'/app/transactions'} />
    }
    return (
        <SidepanelWrapper title={name} back={'/app/transactions'}>
            <Helmet>
                <title>One App | {name}</title>
            </Helmet>
            <div className="flex flex-col gap-5 mt-3">
                <TransactionInfoContainer title={'Description'}>
                    {description || 'No Description'}
                </TransactionInfoContainer>

                <div className="flex items-center gap-3">
                    <TransactionInfoContainer title={'Amount'}>
                        Rs. {amount}
                    </TransactionInfoContainer>
                    <TransactionInfoContainer title={'Date'}>
                        {formatDate(date)}
                    </TransactionInfoContainer>
                </div>


                <div className="flex items-center gap-3">
                    <TransactionInfoContainer title={'Type'}>
                        {type}
                    </TransactionInfoContainer>
                    <TransactionInfoContainer title={'Category'}>
                        {category.name}
                    </TransactionInfoContainer>
                </div>

                <div className="flex items-center gap-3">
                    <TransactionInfoContainer title={'Created from'}>
                        {splitwiseTransaction ? 'Splitwise' : 'Application'}
                    </TransactionInfoContainer>
                    <TransactionInfoContainer title={'Tags'}>
                        {category.name}
                    </TransactionInfoContainer>
                </div>

                {/* tags */}
                {transactionTags.length > 0 && <MultiValueInfoContainer title={'Tags'} values={transactionTags} />}

                {transactionFriends.length > 0 && <MultiValueInfoContainer title={'Friends'} values={transactionFriends} />}

                <button className="btn-floating transition-all group hover:gap-2 hover:w-32" onClick={handleDelete}>
                    <TbTrash />
                    <span className="text-xs text-white whitespace-nowrap w-0 overflow-hidden transition-all group-hover:block  group-hover:w-fit">
                        {'Delete'}
                    </span>
                </button>
            </div>
        </SidepanelWrapper>
    )
}

export default TransactionDetails

const TransactionInfoContainer = ({ title, children }) => (
    <div className="p-2 text-xs bg-slate-50 rounded text-slate-700 font-medium flex flex-col gap-2 transition-all hover:bg-slate-100 flex-1 border border-slate-100">
        <div className="text-[11px] text-slate-500">
            {title}
        </div>
        <div className="capitalize">
            {children}
        </div>
    </div>
)

const MultiValueInfoContainer = ({ values, title }) => (
    <div className="p-2 text-xs bg-slate-50 rounded text-slate-700 font-medium flex flex-col gap-2 transition-all hover:bg-slate-100 flex-1 border border-slate-100">
        <div className="text-[11px] text-slate-500">
            {title}
        </div>
        <div className="flex items-center flex-wrap gap-2">
            {values.map(value => {
                return (
                    <div style={{ backgroundColor: value.color }} className="text-[10px] font-semibold text-white rounded-full w-fit py-1 px-2">
                        {value.name}
                    </div>
                )
            })}
        </div>
    </div>
)