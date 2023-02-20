import Model, { attr, fk, many } from "redux-orm";
import { importSplitwiseTransactionsSucceededAction } from "../shared/actions/entry/splitwise-integrations";
import { createFriendSucceededAction } from "../shared/actions/entry/friends";
import { appInit } from "../shared/slices/core";

export class Friend extends Model {
    static modelName = "Friend";
    static get fields() {
        return {
            id: attr(),
            name: attr(),
            color: attr(),
            source: attr(),
            referenceId: attr(),
            organizationId: fk({
                to: 'Organization',
                as: 'organization',
                relatedName: 'friends'
            })
        };
    }

    static reducer({ type, payload }, Friend) {
        switch (type) {
            case appInit.type:
                payload.friends.forEach(friend => {
                    Friend.upsert(friend);
                })
                break;
            case createFriendSucceededAction.type:
                Friend.upsert(payload.friend);
                break;
            case importSplitwiseTransactionsSucceededAction.type:
                payload.friends.forEach(friend => {
                    Friend.upsert(friend);
                });
                break;
            default:
                break;
        }
    }
}
