import { createSelector } from "redux-orm"
import { orm } from "../models/orm";
import moment from 'moment';


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
    (_, date) => date,
    ({ Transaction }, date) => {
        return Transaction.all().orderBy('date', 'desc').toModelArray().filter(transaction => {
            if(!date) return true;
            return moment(transaction.date).isSame(date, 'dates');
        }).map(transaction => {
            return {
                ...transaction.ref,
                organization: transaction.organization.ref,
                category: transaction.category.ref,
                user: transaction.user.ref
            }
        })
    }
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