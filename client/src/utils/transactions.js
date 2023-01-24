import { COLOR_BY_TRANSACTION_TYPE } from "../constants/transactions";

export const getColorByTransactionType = (type) => {
    return COLOR_BY_TRANSACTION_TYPE[type];
}