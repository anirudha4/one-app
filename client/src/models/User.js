import { createAction } from "@reduxjs/toolkit";
import Model, { attr } from "redux-orm";
import { loginSuccess } from "../shared/slices/auth";

// actions
export const createUser = createAction("models/users/create");
export const udpateUser = createAction("models/users/udpate");
export const deleteUser = createAction("models/users/delete");

// model
export class User extends Model {
    static modelName = "User";
    static get fields() {
        return {
            id: attr(),
            email: attr(),
            name: attr(),
            isAdmin: attr()
        };
    }

    static reducer({ type, payload }, User) {
        switch (type) {
            case createUser.type:
            case loginSuccess.type:
                User.upsert(payload);
                break;
            case deleteUser.type:
                User.withId(payload.id).delete();
                break;
            case udpateUser.type:
                User.withId(payload.id).update(payload.data)
                break;
            default:
                break;
        }
    }
}
