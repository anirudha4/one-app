import Model, { attr, fk, oneToOne } from "redux-orm";
import { importSplitwiseTransactionsSucceededAction } from "../shared/actions/entry/splitwise-integrations";
import { createTransactionSucceededAction } from "../shared/actions/entry/transactions";
import { appInit } from "../shared/slices/core";

export class SplitwiseTransaction extends Model {
    static modelName = "SplitwiseTransaction";
    static get fields() {
        return {
            id: attr(),
            referenceId: attr(),
            // relations
            transactionId: oneToOne({
                to: 'Transaction',
                as: 'transaction',
                relatedName: 'splitwiseTransaction'
            }),
            splitwiseIntegrationId: fk({
                to: 'SplitwiseIntegration',
                as: 'splitwiseIntegration',
                relatedName: 'splitwiseTransaction'
            }),
            organizationId: fk({
                to: 'Organization',
                as: 'organization',
                relatedName: 'splitwiseTransactions'
            }),
        };
    }

    static reducer({ type, payload }, SplitwiseTransaction) {
        switch (type) {
            case appInit.type:
            case importSplitwiseTransactionsSucceededAction.type:
                payload.splitwiseTransactions.forEach(splitwiseTransaction => {
                    SplitwiseTransaction.upsert(splitwiseTransaction);
                })
                break;

            default:
                break;
        }
    }
}
