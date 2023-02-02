import React, { useMemo } from 'react'
import { useRef } from 'react';
import { TbX } from 'react-icons/tb';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { allCategoriesSelector, allTagsSelector } from '../../selectors/all';
import Divider from '../../shared/components/Divider'
import Field from '../Field';
import NumberField from '../Field/NumberField';
import { createObjectFromFormData, validateTransaction } from '../../utils/transactions';
import CustomSelect, { CreatableSelect } from '../../shared/components/Select/CustomSelect';
import { createTagAction } from '../../shared/actions/entry/tags';
import { useState } from 'react';
import DateField from '../Field/DateField';
import TextField from '../Field/TextField';
import SegmentedField from '../Field/SegmentedField';
import { createTransactionAction } from '../../shared/actions/entry/transactions';


function AddTransaction() {
  // local states
  const [selectedTags, setSelectedTags] = useState([]);
  const [persistModal, setPersistModal] = useState(false);
  const [error, setError] = useState(null);
  // refs
  const formRef = useRef();

  // dispatch
  const dispatch = useDispatch();

  // selectors
  const { addingTagLoader } = useSelector(state => state.tag);
  const { addingTransactionLoader } = useSelector(state => state.transaction);
  const categories = useSelector(allCategoriesSelector);
  const tags = useSelector(allTagsSelector);

  // memoize categories
  const CATEGORY_OPTIONS = useMemo(() =>
    categories.map(category => (
      { id: category.id, label: category.name, value: category.id, type: category.type }
    )), []);

  const TAG_OPTIONS = useMemo(() =>
    tags.map(tag => (
      { id: tag.id, label: tag.name, value: tag.id }
    )), [tags]);

  const isTagSelectDisabled = useMemo(() => selectedTags.length >= 3 ? true : false, [selectedTags]);

  // handlers
  const handleCreateTag = async tag => {
    dispatch(createTagAction({ name: tag }));
  }
  const handleCategoryChange = category => {
    formRef.current.type.value = category.type
  }
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const formData = createObjectFromFormData(formRef.current);
      await validateTransaction(formData, ['name', 'type', 'amount', 'date']);
      dispatch(createTransactionAction(formData));
      setError(null);
    } catch (error) {
      setError(error.message);
      const errorElement = formRef.current[error.key];
      if (errorElement) {
        errorElement.focus();
      }
    }
  }

  return (
    <div className='add-transaction-modal-container flex items-center justify-center'>
      <div className="fixed top-0 left-0 w-full h-screen bg-black opacity-40 z-10"></div>
      <div className="fixed z-20 top-0 right-0 h-full add-transaction-card p-4 bg-white max-w-[500px] w-full transition-all duration-75">
        <div className="mb-2 flex items-center justify-between">
          <div className="heading-text text-slate-700 text-lg font-medium">New Transaction</div>
          <Link replace to={'/app/transactions'} className="h-7 w-7 bg-slate-100 flex items-center justify-center rounded-md hover:bg-slate-200 cursor-pointer transition-all">
            <TbX className='text-slate-600' />
          </Link>
        </div>
        <Divider />
        {error && <div className="p-2 text-xs capitalize bg-red-100 text-red-500 mb-3 rounded">{error}</div>}
        <form ref={formRef} onSubmit={handleSubmit} className='mb-2 flex flex-col gap-4'>
          <Field
            label={'Name'}
            placeholder={'Eg. Bought White House'}
            name={'name'} autoFocus
            autoComplete="off"
          />
          <div className="grid grid-cols-2 gap-3 items-center">
            <NumberField
              label={'Amount'}
              placeholder={'10,000'}
              name={'amount'}
              notation="Rs."
              autoComplete="off"
            />
            <DateField
              label={'Date'}
              placeholder={'Transaction Date'}
              name={'date'}
              autoFocus
              autoComplete={false}
            />
          </div>
          <CustomSelect
            options={CATEGORY_OPTIONS}
            name="categoryId"
            label="Categories"
            id="categories"
            defaultValue={CATEGORY_OPTIONS[0]}
            onChange={handleCategoryChange}
          />
          <SegmentedField
            label={'Type'}
            name="type"
            options={[
              { id: 1, label: 'Expense', value: 'expense' },
              { id: 2, label: 'Income', value: 'income' },
              { id: 3, label: 'Investment', value: 'investment' }
            ]}
          />
          <CreatableSelect
            options={TAG_OPTIONS}
            closeMenuOnSelect={false}
            name="tags"
            label="Tags"
            isLoading={addingTagLoader}
            id="tags"
            isMulti
            onChange={tags => setSelectedTags(tags)}
            onCreateOption={handleCreateTag}
          />
          <TextField
            rows={5}
            label={'Description'}
            placeholder={'Small description about transaction'}
            name={'description'}
            notation="Rs."
            autoComplete="off"
          />
          <button disabled={addingTransactionLoader || addingTagLoader} className="btn-primary flex justify-center">{addingTransactionLoader ? 'Adding...' : 'Add Transaction'}</button>
        </form>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            className='accent-black'
            onChange={e => setPersistModal(e.target.checked)}
            value={persistModal}
            id="persist-modal"
          />
          <label
            className='label'
            htmlFor="persist-modal"
          >Keep modal open for new transaction</label>
        </div>
      </div>
    </div>
  )
}

export default AddTransaction