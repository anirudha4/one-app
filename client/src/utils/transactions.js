import { COLOR_BY_TRANSACTION_TYPE } from "../constants/transactions";

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
                    message: `${key} cannot be empty`,
                    key
                }
            }
        }
    });
}