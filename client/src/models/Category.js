import Model, { attr, fk } from "redux-orm";
import { appInit } from "../shared/slices/core";

export class Category extends Model {
    static modelName = "Category";
    static get fields() {
        return {
            id: attr(),
            name: attr(),
            type: attr(),
            organizationId: fk({
                to: 'Organization',
                as: 'organization',
                relatedName: 'categories'
            })
        };
    }

    static reducer({ type, payload }, Category) {
        switch (type) {
            case appInit.type:
                payload.categories.forEach(category => {
                    Category.upsert(category);
                })
                break;
            default:
                break;
        }
    }
}
