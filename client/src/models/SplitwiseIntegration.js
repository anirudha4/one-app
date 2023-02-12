import Model, { attr } from "redux-orm";
import { createSplitwiseIntegrationSucceededAction } from "../shared/actions/entry/splitwise-integrations";
import { appInit } from "../shared/slices/core";

export class SplitwiseIntegration extends Model {
    static modelName = "SplitwiseIntegration";
    static get fields() {
        return {
            id: attr(),
            name: attr()
        };
    }

    static reducer({ type, payload }, SplitwiseIntegration) {
        switch (type) {
            case appInit.type:
                payload.splitwiseIntegrations.forEach(splitwiseIntegration => SplitwiseIntegration.upsert(splitwiseIntegration));
                break;
            case createSplitwiseIntegrationSucceededAction.type:
                SplitwiseIntegration.upsert(payload.splitwiseIntegration);
                break;
            default:
                break;
        }
    }
}
