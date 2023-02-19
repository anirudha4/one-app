import Model, { attr, fk, many } from "redux-orm";
import { importSplitwiseTransactionsSucceededAction } from "../shared/actions/entry/splitwise-integrations";
import { createTagSucceededAction } from "../shared/actions/entry/tags";
import { appInit } from "../shared/slices/core";

export class Tag extends Model {
    static modelName = "Tag";
    static get fields() {
        return {
            id: attr(),
            name: attr(),
            color: attr(),
            organizationId: fk({
                to: 'Organization',
                as: 'organization',
                relatedName: 'tags'
            })
        };
    }

    static reducer({ type, payload }, Tag) {
        switch (type) {
            case appInit.type:
                payload.tags.forEach(tag => {
                    Tag.upsert(tag);
                })
                break;
            case createTagSucceededAction.type:
                Tag.upsert(payload.tag);
                break;
            case importSplitwiseTransactionsSucceededAction.type:
                payload.tags.forEach(tag => {
                    Tag.upsert(tag);
                });
                break;
            default:
                break;
        }
    }
}
