import Model, { attr, fk, many } from "redux-orm";
import { importSplitwiseTransactionsSucceededAction } from "../shared/actions/entry/splitwise-integrations";
import { createTransactionSucceededAction } from "../shared/actions/entry/transactions";
import { appInit } from "../shared/slices/core";

export class TransactionMember extends Model {
    static modelName = "TransactionMember";
    static get fields() {
        return {
            id: attr(),

            // relations
            transactionId: fk({
                to: 'Transaction',
                as: 'transactions',
                relatedName: 'TransactionMembers'
            }),
            memberId: fk({
                to: 'User',
                as: 'user',
                relatedName: 'members'
            })
        };
    }

    static reducer({ type, payload }, TransactionMember) {
        switch (type) {
            case appInit.type:
                payload.transactionMembers.forEach(transactionMember => {
                    TransactionMember.upsert(transactionMember);
                })
                break;
            case createTransactionSucceededAction.type:
            case importSplitwiseTransactionsSucceededAction.type:
                payload.transactionMembers.forEach(transactionMember => {
                    TransactionMember.upsert(transactionMember);
                })
                break;
            default:
                break;
        }
    }
}
