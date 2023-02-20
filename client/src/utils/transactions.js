import { COLOR_BY_TRANSACTION_TYPE } from "../constants/transactions";
import startCase from 'lodash.startcase';

export const getColorByTransactionType = (type) => {
    return COLOR_BY_TRANSACTION_TYPE[type];
}

export const createObjectFromFormData = (target) => {
    const formData = new FormData(target);
    const values = {};
    for (const key of formData.keys()) {
        values[key] = formData.getAll(key);
        if (values[key].length === 1) {
            const [value] = values[key];
            values[key] = value;
        }
    }
    return values;
}

/**
 * 
 * @param {object} values 
 * @param {array} checkAgainst
 */
export const validateTransaction = (values, checkAgainst) => {
    let error = [];
    Object.keys(values).forEach(key => {
        if (checkAgainst.includes(key)) {
            if (values[key] === '') {
                throw {
                    message: `${startCase(key)} cannot be empty`,
                    key
                }
            }
        }
    });
}

export const getTransactionTypeColor = (type) => {
    switch(type) {
        case 'expense':
            return 'text-red-500';
        case 'income':
            return 'text-teal-500';
        case 'investment':
            return 'text-blue-500';
    }
}