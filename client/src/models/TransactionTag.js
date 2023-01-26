import Model, { attr, fk, many } from "redux-orm";
import { createTransactionSucceededAction } from "../shared/actions/entry/transactions";
import { appInit } from "../shared/slices/core";

export class TransactionTag extends Model {
    static modelName = "TransactionTag";
    static get fields() {
        return {
            id: attr(),

            // relations
            transactionId: fk({
                to: 'Transaction',
                as: 'transactions',
                relatedName: 'transactionTags'
            }),
            tagId: fk({
                to: 'Tag',
                as: 'tags',
                relatedName: 'transactions'
            })
        };
    }

    static reducer({ type, payload }, TransactionTag) {
        switch (type) {
            case appInit.type:
                payload.transactionTags.forEach(tag => {
                    TransactionTag.upsert(tag);
                })
                break;
            case createTransactionSucceededAction.type:
                payload.transactionTags.forEach(transactionTag => {
                    TransactionTag.upsert(transactionTag);
                })
                break;
            default:
                break;
        }
    }
}
