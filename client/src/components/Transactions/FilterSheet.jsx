import React, { useMemo, useState } from 'react'
import { useDispatch } from 'react-redux';
import { toggleFilterPopup } from '../../shared/slices/core';
import BottomSheet from '../../shared/components/Sheets/BottomSheet'
import CustomSelect from '../../shared/components/Select/CustomSelect';
import Field from '../Field';
import NumberField from '../Field/NumberField';
import DateField from '../Field/DateField';
import Alert from '../Alert';
import { validateTransaction } from '../../utils/transactions';
import Divider from '../../shared/components/Divider';

const FILTER_OPTIONS = [
    { id: 1, value: 'name', label: 'Name' },
    { id: 2, value: 'amount', label: 'Amount' },
    // { id: 3, value: 'category', label: 'Category' },
    // { id: 4, value: 'tags', label: 'Tags' },
    // { id: 5, value: 'friends', label: 'Friends' },
    { id: 6, value: 'date', label: 'Date' },
];

const STRING_OPERATORS = [
    { id: 1, value: 'is', label: 'is' },
    { id: 2, value: 'isn', label: 'is not' },
    { id: 3, value: 'cont', label: 'contains' },
]
const NUMBER_OPERATORS = [
    { id: 1, value: 'eq', label: 'equals' },
    { id: 2, value: 'neq', label: 'not equals' },
    { id: 3, value: 'gt', label: 'greater than' },
    { id: 4, value: 'lt', label: 'less than' },
]

const DATE_OPERATORS = [
    { id: 1, value: 'af', label: 'after' },
    { id: 2, value: 'bf', label: 'before' },
    // { id: 3, value: 'rng', label: 'range' }
]
const FILTER_OPERATORS = {
    name: STRING_OPERATORS,
    amount: NUMBER_OPERATORS,
    date: DATE_OPERATORS
}
const COLUMN_TYPE = {
    name: 'string',
    amount: 'number',
    date: 'date'
}

function FilterSheet() {
    const dispatch = useDispatch();

    // local states
    const [error, setError] = useState(null);
    const [filters, setFilters] = useState([]);
    const [selectedFilter, setSelectedFilter] = useState({});

    const handleColumnTypeSelect = column => {
        setSelectedFilter({
            column: column,
            operator: null,
            value: ''
        });
        setError(null)
    }

    const handleSelectOperator = operator => {
        setSelectedFilter({
            ...selectedFilter,
            operator: operator,
        })
        setError(null);
    }
    const handleValueChange = e => {
        setSelectedFilter({
            ...selectedFilter,
            value: e.target.value
        })
    }
    const handleBlur = e => {
        try {
            validateTransaction(selectedFilter, ['column', 'operator', 'value']);
            setError(null);
            setFilters([...filters, selectedFilter]);
            setSelectedFilter({
                column: null,
                operator: null,
                value: ''
            });
        } catch (err) {
            setError(err.message);
        }
    }
    const handleClose = () => {
        dispatch(toggleFilterPopup())
    }

    // render appropriate input field
    const FIELD_TYPE_MAP = useMemo(() => ({
        string: <Field
            label={'Value'}
            disabled={!selectedFilter.column || !selectedFilter.operator}
            onChange={handleValueChange}
            value={selectedFilter.value}
            onBlur={handleBlur}
        />,
        number: <NumberField
            label={'Value'}
            disabled={!selectedFilter.column || !selectedFilter.operator}
            onChange={handleValueChange}
            value={selectedFilter.value}
            onBlur={handleBlur}
        />,
        date: <DateField
            label={'Value'}
            disabled={!selectedFilter.column || !selectedFilter.operator}
            onChange={handleValueChange}
            selected={selectedFilter.value}
            onBlur={handleBlur}
        />,
    }), [selectedFilter, handleValueChange]);
    return (
        <BottomSheet title={'Filter Transactions'} onClose={handleClose}>
            {/* choose */}
            <div className="flex items-center gap-2">
                <CustomSelect
                    options={FILTER_OPTIONS}
                    label="Choose Column"
                    onChange={handleColumnTypeSelect}
                    value={selectedFilter.column}
                />
                <CustomSelect
                    label={'Choose Operator'}
                    options={FILTER_OPERATORS[selectedFilter.column?.value]}
                    isDisabled={!selectedFilter.column}
                    onChange={handleSelectOperator}
                    value={selectedFilter.operator}
                />
                {FIELD_TYPE_MAP[COLUMN_TYPE[selectedFilter.column?.value]] || <Field label={'Value'} disabled />}
            </div>
            {error && <Alert className='my-4' type='danger' message={error} />}
            <Divider className='mt-3 mb-4' />
            {/* applied */}
            <div className="flex flex-col gap-3">

                {filters.map(filter => {
                    return (
                        <div className='flex items-center gap-2'>
                            <CustomSelect
                                options={FILTER_OPTIONS}
                                onChange={handleColumnTypeSelect}
                                value={filter.column}
                            />
                            <CustomSelect
                                options={FILTER_OPERATORS[filter.column?.value]}
                                onChange={handleSelectOperator}
                                value={filter.operator}
                            />
                            <Field
                                value={filter.value}
                            />
                        </div>
                    )
                })}
            </div>
        </BottomSheet>
    )
}

export default FilterSheet