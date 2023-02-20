import React from 'react'
import { TbTrash } from 'react-icons/tb'
import { useDispatch, useSelector } from 'react-redux';
import { currentWalletSelector } from '../../selectors/current';
import { bulkDeleteTransactionAction } from '../../shared/actions/entry/transactions'
import Loader from '../../shared/components/Loader';
import CustomSelect from '../../shared/components/Select/CustomSelect'

function BulkAction({ checkedTransactionIds }) {
    const wallet = useSelector(currentWalletSelector)
    const { deletingTransactionLoader } = useSelector(state => state.transaction);
    const dispatch = useDispatch();
    const handleDelete = () => {
        dispatch(bulkDeleteTransactionAction({ transactionIds: checkedTransactionIds, walletId: wallet.id }));
    }
    const handleChangeType = (type) => {
    }
    return (
        <div className='flex items-center gap-2 transition-all duration-100'>
            <button className="btn-primary-outline" onClick={handleDelete}>
                {deletingTransactionLoader ? <Loader /> : <TbTrash size={16} />}
                {deletingTransactionLoader ? 'Deleting' : 'Delete'}
            </button>
        </div>
    )
}

export default BulkAction