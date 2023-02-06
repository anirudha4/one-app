import { createSelector } from "redux-orm";
import orm from "../models/orm";

export const makeTransactionTagsByTransactionId = () => createSelector(
    orm,
    (_, id) => id,
    ({ Transaction }, id) => {
        const transaction = Transaction.withId(id);
        const transactionTags = transaction.transactionTags.toModelArray();
        const tags = transactionTags.map(transactionTag => transactionTag.tags.ref);
        return tags;
    }
)