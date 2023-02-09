import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Field from '../../components/Field';
import NumberField from '../../components/Field/NumberField';
import Divider from '../../shared/components/Divider';
import Alert from '../../components/Alert';

import { currentWalletSelector } from '../../selectors/current';
import { IoWalletOutline } from 'react-icons/io5';
import { createObjectFromFormData, validateTransaction } from '../../utils/transactions';
import { updateWalletsAction } from '../../shared/actions/entry/wallets';

function ManageWallets() {
  // dispatch
  const dispatch = useDispatch();

  // local states
  const [error, setError] = useState('');

  // selector
  const wallet = useSelector(currentWalletSelector);

  // refs
  const formRef = useRef();

  // handlers
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const formData = createObjectFromFormData(formRef.current);
      await validateTransaction(formData, ['name', 'amount']);
      dispatch(updateWalletsAction(formData));
      setError(null);
      formRef.current.reset();
    } catch (error) {
      setError(error.message);
      const errorElement = formRef.current[error.key];
      if (errorElement) {
        errorElement.focus();
      }
    }
  }
  return (
    <div className='p-2'>
      <div className="card p-3 max-w-[600px] w-full mx-auto">
        <div className="heading-text mb-2">
          Wallet Settings
        </div>
        <Divider />
        {error && <Alert type="danger" message={error} />}
        <form ref={formRef} onSubmit={handleSubmit} className='flex flex-col gap-3 mt-5'>
          <input type="hidden" name="id" value={wallet.id} />
          <Field
            name={'name'}
            id={'name'}
            label={'Name'}
            defaultValue={wallet.name}
          />
          <NumberField
            label={'Amount'}
            placeholder={'Wallet Balance'}
            name={'amount'}
            notation="Rs."
            autoComplete="off"
            defaultValue={wallet.amount > 0 ? wallet.amount : 0}
          />
          <button className="btn-primary justify-center mt-2">
            <IoWalletOutline size={16} />
            Update Wallet
          </button>
        </form>
      </div>
    </div>
  )
}

export default ManageWallets