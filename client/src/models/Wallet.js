import Model, { attr, fk } from "redux-orm";
import { createTransactionSucceededAction, deleteTransactionSucceededAction } from "../shared/actions/entry/transactions";
import { updateWalletsSucceededAction } from "../shared/actions/entry/wallets";
import { appInit } from "../shared/slices/core";

export class Wallet extends Model {
    static modelName = "Wallet";
    static get fields() {
        return {
            id: attr(),
            name: attr(),
            color: attr(),
            amount: attr(),
            organizationId: fk({
                to: 'Organization',
                as: 'organization',
                relatedName: 'wallets'
            })
        };
    }

    static reducer({ type, payload }, Wallet) {
        switch (type) {
            case appInit.type:
                payload.wallets.forEach(wallet => {
                    Wallet.upsert(wallet);
                })
                break;
            case updateWalletsSucceededAction.type:
                Wallet.withId(payload.id).update(payload);
                break;
            case createTransactionSucceededAction.type:
                Wallet.withId(payload.wallet.id).update(payload.wallet);
                break;
            case deleteTransactionSucceededAction.type:
                Wallet.withId(payload.wallet.id).update(payload.wallet);
                break;
            default:
                break;
        }
    }
}
