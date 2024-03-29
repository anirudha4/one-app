import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Field from '../../Field';
import { splitwiseIntegrationById } from '../../../selectors/by-id';
import { fetchSplitwiseGroups, fetchSplitwiseTransactions } from '../../../api/splitwise-integration';
import { generateAuthenticationHeaders } from '../../../utils/authentication'
import CustomSelect from '../../../shared/components/Select/CustomSelect';
import Alert from '../../../components/Alert';
import DateField from '../../Field/DateField';
import { createObjectFromFormData, validateTransaction } from '../../../utils/transactions';
import Divider from '../../../shared/components/Divider';
import SplitwiseExpenseList from './SplitwiseExpenseList';
import Checkbox from '../../../shared/components/Checkbox';
import { checkAllSplitwiseTransaction, importSplitwiseTransactionsAction, unCheckAllSplitwiseTransaction } from '../../../shared/actions/entry/splitwise-integrations';
import { areAllSplitwiseTransactionsSelectedForActionSelector, isSelectAllCheckboxDisabledSelector } from '../../../selectors/boolean';
import Loader from '../../../shared/components/Loader';
import { splitwiseExpensesThatCanBeImported } from '../../../selectors/computed';

function ConfigureSplitwise({ id }) {
  const dispatch = useDispatch();

  // refs
  const formRef = useRef();

  const [error, setError] = useState('');

  const [showUserExpenses, setShowUserExpenses] = useState(false);

  const [groupConfig, setGroupConfig] = useState({
    groups: [],
    groupsLoading: true,
    selectedGroup: null
  });
  const [expensesConfig, setExpensesConfig] = useState({
    expenses: null,
    expensesLoading: false,
    fetched: false
  });

  // selectors
  const { splitwiseUser } = useSelector(state => splitwiseIntegrationById(state, id));
  const { transactionsToImport, transactionsImported, transactionsImporting } = useSelector(state => state.splitwise);

  // const { filteredExpenses } = useMemo(() => {
  //   if (!expensesConfig.expenses) return { filteredExpenses: [], total: 0 };
  //   return {
  //     filteredExpenses:
  //       expensesConfig.expenses.filter(expense =>
  //         !(['payment', 'debt_consolidation'].includes(expense.creation_method)) && (showUserExpenses ? expense.created_by.id === splitwiseUser.id : true)),
  //   }
  // }, [expensesConfig.expenses, showUserExpenses])
  const { filteredExpenses, alreadyImported } = useSelector(state => splitwiseExpensesThatCanBeImported(state, expensesConfig, showUserExpenses, splitwiseUser));

  const mergedExpenses = useMemo(() => [...filteredExpenses, ...alreadyImported], [filteredExpenses, alreadyImported])
  const filteredExpensesTotal = useMemo(() => {
    return mergedExpenses.reduce((a, b) => parseInt(a) + parseInt(b.cost), 0)
  }, [mergedExpenses])

  const areAllSplitwiseTransactionsSelectedForAction = useSelector(state => areAllSplitwiseTransactionsSelectedForActionSelector(state, filteredExpenses));

  const isSelectAllCheckboxDisabled = useSelector(state => isSelectAllCheckboxDisabledSelector(state, filteredExpenses));

  const handleCheckAllTransactions = checked => {
    if (checked) {
      dispatch(checkAllSplitwiseTransaction({ transactions: filteredExpenses }));
    } else {
      dispatch(unCheckAllSplitwiseTransaction());
    }
  }

  // handlers
  const handleFetchTransactionClick = async (e) => {
    e.preventDefault();
    try {
      const formData = createObjectFromFormData(formRef.current);
      await validateTransaction(formData, ['group_id', 'dated_after']);
      setExpensesConfig({ ...expensesConfig, expensesLoading: true, fetched: false });
      setError('');
      const { expenses } = await fetchSplitwiseTransactions(id, formData, generateAuthenticationHeaders());
      setExpensesConfig({ ...expensesConfig, expensesLoading: false, expenses, fetched: true });
      setGroupConfig({ ...groupConfig, selectedGroup: GROUP_OPTIONS.find(g => g.id == formData.group_id) })
    } catch (error) {
      setError(error.message);
      const errorElement = formRef.current[error.key];
      if (errorElement) {
        errorElement.focus();
      }
    }
  }
  const toggleShowUserExpense = checked => {
    setShowUserExpenses(checked);
  }

  const handleImportSplitwiseTransactions = () => {
    dispatch(importSplitwiseTransactionsAction({ transactionsToImport, integrationId: id }));
  }

  // custom select options
  const GROUP_OPTIONS = useMemo(() =>
    groupConfig.groups.map(group => (
      { id: group.id, label: group.name, value: group.id }
    )), [groupConfig.groups]);

  useEffect(() => {
    fetchSplitwiseGroups(id, generateAuthenticationHeaders()).then(response => {
      setGroupConfig({ ...groupConfig, groupsLoading: false, groups: response.groups });
    })
  }, []);

  useEffect(() => {
    dispatch(unCheckAllSplitwiseTransaction());
  }, [showUserExpenses])

  return (
    <div className='pt-3 pb-2 flex flex-col h-full'>
      <div>
        <form onSubmit={handleFetchTransactionClick} ref={formRef} className="flex flex-col w-full gap-4 my-2 p-2">
          <div className="flex items-center gap-4">
            <Field
              label={'Splitwise User'}
              disabled={true}
              readOnly={true}
              value={`${splitwiseUser.first_name} ${splitwiseUser?.lastName ? splitwiseUser.lastName : ''} (${splitwiseUser.email ? splitwiseUser.email : ''})`}
            />
            <CustomSelect
              isLoading={groupConfig.groupsLoading}
              options={GROUP_OPTIONS}
              label='Choose Group'
              name={'group_id'}
              id='choose-group'
            />
            <DateField
              id={'start-date-field'}
              label='Get Transactions After'
              labelInfo={"You cannot choose todays date's"}
              name={'dated_after'}
              maxDate={new Date()}
            />
          </div>
          <button disabled={expensesConfig.expensesLoading} className="btn-primary w-fit">
            {expensesConfig.expensesLoading && <Loader />}
            Search Expenses
          </button>
        </form>
        {error && <Alert type='danger' message={error} />}
      </div>
      <div className='flex-1 overflow-scroll'>
        {(expensesConfig.expenses?.length > 0) && (
          <>
            <div className="flex items-center justify-between p-2">
              <div className="text-xs text-gray-700 font-medium mt-2 pb-2">
                {mergedExpenses.length} {mergedExpenses.length > 1 ? 'Expenses' : 'Expense'} ({alreadyImported.length} imported) associated with <span className="font-bold text-black">{groupConfig.selectedGroup?.label}</span>.
              </div>
              <div className="flex items-center gap-2">
                <div className="text-xs py-1 px-3 bg-green-50 rounded font-semibold text-green-600">
                  Rs. {parseFloat(filteredExpensesTotal).toFixed(2)}
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox checked={showUserExpenses} onChange={toggleShowUserExpense} />
                  <label className='text-xs font-medium text-slate-700'>Show transactions created by you</label>
                </div>
              </div>
            </div>
            <Divider />
            {mergedExpenses.length > 0 && <>
              <div className="flex items-center gap-2 mb-2 px-4">
                <Checkbox disabled={isSelectAllCheckboxDisabled} checked={areAllSplitwiseTransactionsSelectedForAction} onChange={handleCheckAllTransactions} />
                <div className="text-xs font-medium select-none text-slate-800">Select All</div>
              </div>
              <div className='gap-3 p-2'>
                <div className="flex flex-col gap-2">
                  <SplitwiseExpenseList filteredExpenses={mergedExpenses} showUserExpenses={showUserExpenses} />
                </div>
                <button
                  className="btn-primary w-fit"
                  onClick={handleImportSplitwiseTransactions}
                  disabled={transactionsToImport.length === 0 || transactionsImporting}
                >
                  {transactionsImporting && <Loader />}
                  {transactionsImporting ? 'Importing Expenses' : 'Import Expenses'}
                </button>
              </div>
            </>}
            {(expensesConfig.fetched && mergedExpenses.length === 0) && <Alert message={'No transactions found. Try another filter'} />}
          </>
        )}
      </div>

    </div>
  )
}

export default ConfigureSplitwise