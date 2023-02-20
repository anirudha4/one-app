import React, { useState, useRef, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { allCategoriesSelector, allFriendsSelector, allTagsSelector } from '../../selectors/all';
import { currentWalletSelector } from '../../selectors/current';
import NumberField from '../Field/NumberField';
import Field from '../Field';
import { createObjectFromFormData, validateTransaction } from '../../utils/transactions';
import CustomSelect, { CreatableSelect } from '../../shared/components/Select/CustomSelect';
import { createTagAction } from '../../shared/actions/entry/tags';
import DateField from '../Field/DateField';
import TextField from '../Field/TextField';
import SegmentedField from '../Field/SegmentedField';
import { createTransactionAction } from '../../shared/actions/entry/transactions';
import SidepanelWrapper from '../../shared/components/SidepanelWrapper';
import { createFriendAction } from '../../shared/actions/entry/friends';
import { SOURCE_TYPES } from '../../constants/config';
import { generateSource } from '../../utils';


function AddTransaction() {
  // local states
  const [persistModal, setPersistModal] = useState(false);
  const [error, setError] = useState(null);
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedFriends, setSelectedFriends] = useState([]);

  // refs
  const formRef = useRef();

  // dispatch 
  const dispatch = useDispatch();

  // selectors
  const { addingTagLoader } = useSelector(state => state.tag);
  const { addingTransactionLoader } = useSelector(state => state.transaction);
  const categories = useSelector(allCategoriesSelector);
  const tags = useSelector(allTagsSelector);
  const friends = useSelector(allFriendsSelector);
  const wallet = useSelector(currentWalletSelector);

  // memoize categories
  const CATEGORY_OPTIONS = useMemo(() =>
    categories.map(category => (
      { id: category.id, label: category.name, value: category.id, type: category.type }
    )), []);

  const TAG_OPTIONS = useMemo(() =>
    tags.map(tag => (
      { id: tag.id, label: tag.name, value: tag.id }
    )), [tags]);

  const FRIEND_OPTIONS = useMemo(() =>
    friends.map(friend => (
      { id: friend.id, label: friend.name, value: friend.id }
    )), [friends]);


  // handlers
  const handleCreateTag = async tag => {
    dispatch(createTagAction({ name: tag }));
  }

  const handleCreateFriend = async friend => {
    dispatch(createFriendAction({ name: friend, source: generateSource(SOURCE_TYPES.APPLICATION) }));
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
    <SidepanelWrapper back={'/app/transactions'} title="New Transaction">
      {error && <div className="p-2 text-xs capitalize bg-red-100 text-red-500 mb-3 rounded">{error}</div>}
      <form ref={formRef} onSubmit={handleSubmit} className='mb-2 flex flex-col gap-4 pt-4'>
        <input type="hidden" name="walletId" value={wallet.id} />
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
            autoComplete={'off'}
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

        <CreatableSelect
          options={FRIEND_OPTIONS}
          closeMenuOnSelect={false}
          name="friends"
          label="Shared With"
          isLoading={addingTagLoader}
          id="friends"
          isMulti
          onChange={friends => setSelectedFriends(friends)}
          onCreateOption={handleCreateFriend}
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
    </SidepanelWrapper>
  )
}

export default AddTransaction