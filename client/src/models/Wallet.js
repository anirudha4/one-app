import Model, { attr, fk } from "redux-orm";
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
            default:
                break;
        }
    }
}
