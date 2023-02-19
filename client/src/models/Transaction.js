import Model, { attr, fk } from "redux-orm";
import { importSplitwiseTransactionsSucceededAction } from "../shared/actions/entry/splitwise-integrations";
import { bulkDeleteTransactionSucceededAction, createTransactionSucceededAction, deleteTransactionSucceededAction } from "../shared/actions/entry/transactions";
import { appInit } from "../shared/slices/core";

export class Transaction extends Model {
    static modelName = "Transaction";
    static get fields() {
        return {
            id: attr(),
            name: attr(),
            type: attr(),
            amount: attr(),
            date: attr(),
            description: attr(),

            // relations
            userId: fk({
                to: 'User',
                as: 'user',
                relatedName: 'transaction'
            }),
            categoryId: fk({
                to: 'Category',
                as: 'category',
                relatedName: 'transactions'
            }),
            walletId: fk({
                to: 'Wallet',
                as: 'wallet',
                relatedName: 'transactions'
            }),
            organizationId: fk({
                to: 'Organization',
                as: 'organization',
                relatedName: 'transactions'
            })
        };
    }

    static reducer({ type, payload }, Transaction) {
        switch (type) {
            case appInit.type:
                payload.transactions.forEach(tag => {
                    Transaction.upsert(tag);
                })
                break;
            case createTransactionSucceededAction.type:
                Transaction.upsert(payload.transaction);
                break;
            case deleteTransactionSucceededAction.type:
                Transaction.withId(payload.transaction.id).delete()
                break;
            case bulkDeleteTransactionSucceededAction.type:
                payload.transactions.forEach(transaction => {
                    Transaction.withId(transaction.id).delete();
                });
                break;
            case importSplitwiseTransactionsSucceededAction.type:
                payload.transactions.forEach(transaction => {
                    Transaction.upsert(transaction);
                });
                break;
            default:
                break;
        }
    }
}
