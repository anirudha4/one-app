import { createSelector } from "redux-orm"
import { orm } from "../models/orm";


export const allCategoriesSelector = createSelector(
    orm,
    ({ Category }) => Category.all().toRefArray()
);

export const allTagsSelector = createSelector(
    orm,
    ({ Tag }) => Tag.all().toRefArray()
);

export const allTransactionSelector = createSelector(
    orm,
    ({ Transaction }) => Transaction.all().orderBy('createdAt', 'desc').toModelArray().map(transaction => {
        return {
            ...transaction.ref,
            organization: transaction.organization.ref,
            category: transaction.category.ref,
            user: transaction.user.ref
        }
    })
)