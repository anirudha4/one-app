import { createSelector } from "redux-orm";
import orm from "../models/orm";

export const makeTransactionTagsByTransactionId = () => createSelector(
    orm,
    (_, id) => id,
    ({ Transaction }, id) => {
        const transaction = Transaction.withId(id);
        if(!transaction) return null;
        const transactionTags = transaction.transactionTags.toModelArray();
        const tags = transactionTags.map(transactionTag => {
            return { ...transactionTag.tags.ref, key: transactionTag.id }
        });
        return tags;
    }
)
export const makeTransactionMembersByTransactionId = () => createSelector(
    orm,
    (_, id) => id,
    ({ Transaction }, id) => {
        const transaction = Transaction.withId(id);
        if(!transaction) return null;

        const transactionMembers = transaction.transactionMembers.toModelArray();
        const friends = transactionMembers.map(transactionMember => {
            return { ...transactionMember.friends.ref, key: transactionMember.id }
        });
        return friends;
    }
)

export const transactionByIdSelector = createSelector(
    orm,
    (_, id) => id,
    makeTransactionTagsByTransactionId(),
    makeTransactionMembersByTransactionId(),
    ({ Transaction }, id, transactionTags, transactionFriends) => {
        const transaction = Transaction.withId(id);
        if(!transaction) return {};
        return {
            ...transaction.ref,
            organization: transaction.organization.ref,
            category: transaction.category.ref,
            user: transaction.user.ref,
            transactionTags,
            splitwiseTransaction: transaction.splitwiseTransaction?.ref,
            transactionFriends
        }
    }
)


export const splitwiseIntegrationById = createSelector(
    orm,
    (_, id) => id,
    ({ SplitwiseIntegration }, id) => {
        return SplitwiseIntegration.withId(id).ref;
    }
)