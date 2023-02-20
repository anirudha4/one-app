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

export const allFriendsSelector = createSelector(
    orm,
    ({ Friend }) => Friend.all().toRefArray()
);

export const allTransactionSelector = createSelector(
    orm,
    ({ Transaction }) => Transaction.all().orderBy('date', 'desc').toModelArray().map(transaction => {
        return {
            ...transaction.ref,
            organization: transaction.organization.ref,
            category: transaction.category.ref,
            user: transaction.user.ref
        }
    })
)

export const allMembersSelector = createSelector(
    orm, 
    ({ User }) => User.all().toRefArray()
)

export const allOrganizationSelector = createSelector(
    orm,
    ({ Organization }) => Organization.all().toRefArray()
)

export const allWalletsSelector = createSelector(
    orm,
    ({ Wallet }) => Wallet.all().toRefArray()
)

export const allActiveIntegrationSelector = createSelector(
    orm,
    ({ SplitwiseIntegration }) => SplitwiseIntegration.all().toRefArray()
)