import Model, { attr } from "redux-orm";
import { appInit } from "../shared/slices/core";

export class Organization extends Model {
    static modelName = "Organization";
    static get fields() {
        return {
            id: attr(),
            name: attr()
        };
    }

    static reducer({ type, payload }, Organization) {
        switch (type) {
            case appInit.type:
                payload.organizations.forEach(organization => Organization.upsert(organization));
                break;
            default:
                break;
        }
    }
}
