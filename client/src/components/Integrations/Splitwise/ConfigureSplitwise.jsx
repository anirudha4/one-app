import React, { useEffect, useMemo, useRef, useState } from 'react'
import { fetchSplitwiseGroups, fetchSplitwiseTransactions } from '../../../api/splitwise-integration';
import { generateAuthenticationHeaders } from '../../../utils/authentication'
import CustomSelect from '../../../shared/components/Select/CustomSelect';
import Alert from '../../../components/Alert';
import DateField from '../../Field/DateField';
import { createObjectFromFormData, validateTransaction } from '../../../utils/transactions';
import Divider from '../../../shared/components/Divider';
import SplitwiseExpenseList from './SplitwiseExpenseList';
import { useSelector } from 'react-redux';

function ConfigureSplitwise({ id }) {

  // refs
  const formRef = useRef();

  const [error, setError] = useState('');

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
  const { transactionsToImport } = useSelector(state => state.splitwise)

  const { filteredExpenses, total } = useMemo(() => {
    if (!expensesConfig.expenses) return { filteredExpenses: [], total: 0 };
    return { filteredExpenses: expensesConfig.expenses.filter(expense => !(['payment', 'debt_consolidation'].includes(expense.creation_method))), total: expensesConfig.expenses.reduce((a, b) => parseInt(a) + parseInt(b.cost), 0) }
  }, [expensesConfig.expenses])

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
  return (
    <div className='pt-3 pb-2 h-full overflow-hidden flex flex-col'>

      <form onSubmit={handleFetchTransactionClick} ref={formRef} className="flex flex-col w-full gap-4 my-2 p-2">
        <div className="flex items-center gap-4 w-full">
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
          {expensesConfig.expensesLoading && <div className="loader ease-linear rounded-full border border-t border-gray-200 h-[18px] w-[18px]"></div>}
          Search Expenses
        </button>
      </form>
      <br />
      {error && <Alert type='danger' message={error} />}
      {(expensesConfig.fetched && filteredExpenses.length === 0) && <Alert message={'No transactions found. Try another filter'} />}
      {(filteredExpenses.length > 0) && (
        <>
          <div className="flex items-center justify-between p-2">
            <div className="text-xs text-gray-700 font-medium mt-2 pb-2">
              {filteredExpenses.length} {filteredExpenses.length > 1 ? 'Expenses' : 'Expense'} associated with <span className="font-bold text-black">{groupConfig.selectedGroup?.label}</span>.
            </div>
            <div className="text-xs py-1 px-3 bg-green-50 rounded font-semibold text-green-600">
              Rs. {parseFloat(total).toFixed(2)}
            </div>
          </div>
          <Divider />
          <div className='flex flex-col overflow-hidden gap-3 p-2'>
            <div className="overflow-scroll flex flex-col gap-2">
              <SplitwiseExpenseList filteredExpenses={filteredExpenses} />
            </div>

            <button className="btn-primary w-fit" disabled={transactionsToImport.length === 0}>Import Expenses</button>
          </div>
        </>
      )}

    </div>
  )
}

export default ConfigureSplitwise