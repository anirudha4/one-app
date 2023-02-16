import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useDispatch } from 'react-redux';
import { fetchSplitwiseGroups, fetchSplitwiseTransactions } from '../../../api/splitwise-integration';
import { generateAuthenticationHeaders } from '../../../utils/authentication'
import CustomSelect from '../../../shared/components/Select/CustomSelect';
import Alert from '../../../components/Alert';
import DateField from '../../Field/DateField';
import { createObjectFromFormData, validateTransaction } from '../../../utils/transactions';
import Divider from '../../../shared/components/Divider';

function ConfigureSplitwise({ id }) {
  const dispatch = useDispatch();

  // refs
  const formRef = useRef();

  const [error, setError] = useState('');
  const [groupConfig, setGroupConfig] = useState({
    groups: [],
    groupsLoading: true,
    selectedGroup: null
  });
  const [expensesConfig, setExpensesConfig] = useState({
    expenses: [],
    expensesLoading: false
  });

  const { filteredExpenses, total } = useMemo(() => {
    return { filteredExpenses: expensesConfig.expenses.filter(expense => !(['payment', 'debt_consolidation'].includes(expense.creation_method))), total: expensesConfig.expenses.reduce((a, b) => parseInt(a) + parseInt(b.cost), 0) }
  }, [expensesConfig.expenses])

  const handleFetchTransactionClick = async (e) => {
    e.preventDefault();
    try {
      const formData = createObjectFromFormData(formRef.current);
      await validateTransaction(formData, ['group_id', 'dated_after']);
      setExpensesConfig({ ...expensesConfig, expensesLoading: true });
      setError('');
      const { expenses } = await fetchSplitwiseTransactions(id, formData, generateAuthenticationHeaders());
      console.log({ expenses });
      setExpensesConfig({ ...expensesConfig, expensesLoading: false, expenses });
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

      <form onSubmit={handleFetchTransactionClick} ref={formRef} className="flex flex-col w-full gap-4 my-2">
        <div className="flex items-center gap-2 w-full">
          <CustomSelect
            isLoading={groupConfig.groupsLoading}
            options={GROUP_OPTIONS}
            label='Choose Group'
            name={'group_id'}
            id='choose-group'
          />
          <DateField
            id={'date-field'}
            label='Choose Date'
            name={'dated_after'}
          />
        </div>
        <button disabled={expensesConfig.expensesLoading} className="btn-primary w-fit disabled:bg-slate-200 disabled:text-slate-600 disabled:cursor-not-allowed">
          {expensesConfig.expensesLoading && <div className="loader ease-linear rounded-full border border-t border-gray-200 h-[18px] w-[18px]"></div>}
          Search Expenses
        </button>
      </form>
      <br />
      {error && <Alert type='danger' message={error} />}
      {(expensesConfig.expenses.length > 0) && (
        <>
          {total}
          <div className="text-md text-slate-600 font-medium mt-2 pb-2">{filteredExpenses.length} Expenses associated with found {groupConfig.selectedGroup.label}</div>
          <Divider />
          <div className='flex flex-col overflow-hidden gap-3'>
            <div className="overflow-scroll flex flex-col gap-2">
              {filteredExpenses.map(expense => {
                return (
                  <div key={expense.id} className="p-2 border rounded splitwise-expense-grid">
                    <div className="flex gap-2 items-center">
                      <div className="text-xs font-semibold truncate">
                        {expense.description}
                      </div>
                      <div className="px-2 py-[2px] text-[10px] font-medium text-slate-700 bg-slate-50 border border-slate-300 rounded capitalize w-fit">
                        {expense.created_by.first_name.toLowerCase()} paid Rs.{expense.cost}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 items-center justify-end">
                      {expense.users.map(user => {
                        return (
                          <div key={user.id} className="px-2 py-1 text-[10px] font-medium text-black bg-slate-100 rounded capitalize">
                            {user.user.first_name.toLowerCase()}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )
              })}
            </div>

            <button className="btn-primary w-fit">Import Expenses</button>
          </div>
        </>
      )}

    </div>
  )
}

export default ConfigureSplitwise