import React, { useMemo } from 'react'
import { useRef } from 'react';
import { TbX } from 'react-icons/tb';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { allCategoriesSelector } from '../../selectors/all';
import Divider from '../../shared/components/Divider'
import Select from '../../shared/components/Select';
import Field from '../Field';
import NumberField from '../Field/NumberField';
import { COLOR_BY_TRANSACTION_TYPE } from '../../constants/transactions';

const maskForAmount = () => {
  const decimalRegex = /^\d+(\.\d*)?$/;
  return [decimalRegex];
}

function AddTransaction() {

  // selectors
  const categories = useSelector(allCategoriesSelector);
  // memoize categories
  const CATEGORY_OPTIONS = useMemo(() =>
    categories.map(category => (
      { id: category.id, label: category.name, value: category.id, extraLabel: category.type, extraLabelColor: COLOR_BY_TRANSACTION_TYPE[category.type] }
    )), []);
  const formRef = useRef();
  const handleSubmit = e => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    console.log(formData.get('category'));
  }
  return (
    <div className='add-transaction-modal-container flex items-center justify-center'>
      <Link to={'/app/transactions'} className="fixed top-0 left-0 w-full h-screen bg-black opacity-40 z-10"></Link>
      <div className="fixed rounded z-20 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] add-transaction-card p-4 bg-white max-w-[500px] w-full">
        <div className="mb-2 flex items-center justify-between">
          <div className="heading-text text-slate-700 text-lg font-medium">New Transaction</div>
          <Link to={'/app/transactions'} className="h-7 w-7 bg-slate-100 flex items-center justify-center rounded-md hover:bg-slate-200 cursor-pointer transition-all">
            <TbX className='text-slate-600' />
          </Link>
        </div>
        <Divider />
        <form ref={formRef} onSubmit={handleSubmit} className='mb-2 flex flex-col gap-4'>
          <Field label={'Name'} placeholder={'Eg. Bought White House'} name={'name'} />
          <NumberField label={'Amount'} placeholder={'Eg. 10,000'} name={'amount'} />
          <Select name={'category'} label={'Category'} options={CATEGORY_OPTIONS} />
          <button className="btn-primary flex justify-center">Add Transaction</button>
        </form>
      </div>
    </div>
  )
}

export default AddTransaction