import { createSelector } from "redux-orm";
import orm from "../models/orm";

export const makeTransactionTagsByTransactionId = () => createSelector(
    orm,
    (_, id) => id,
    ({ Transaction }, id) => {
        const transaction = Transaction.withId(id);
        const transactionTags = transaction.transactionTags.toModelArray();
        const tags = transactionTags.map(transactionTag => {
            return { ...transactionTag.tags.ref, key: transactionTag.id }
        });
        return tags;
    }
)

export const transactionByIdSelector = createSelector(
    orm,
    (_, id) => id,
    makeTransactionTagsByTransactionId(),
    ({ Transaction }, id, transactionTags) => {
        console.log({ id, transactionTags });
        const transaction = Transaction.withId(id).ref;
        return {
            ...transaction,
            transactionTags
        }
    }
)