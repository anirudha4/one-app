import { createAction } from "@reduxjs/toolkit";
import Model, { attr, fk } from "redux-orm";
import { createMemberSucceededAction } from "../shared/actions/entry/members";
import { updateUsersRecievedAction } from "../shared/actions/entry/users";
import { loginSuccess } from "../shared/slices/auth";
import { appInit } from "../shared/slices/core";

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
            isAdmin: attr(),
            username: attr(),
            phone: attr(),
            registrationType: attr(),
            isEmailVerfied: attr(),
            color: attr(),
            organizationId: fk({
                to: 'Organization',
                as: 'organization',
                relatedName: 'users'
            })
        };
    }

    static reducer({ type, payload }, User) {
        switch (type) {
            case appInit.type:
                payload.members.forEach(member => {
                    User.upsert(member);
                })
                break;
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
            case createMemberSucceededAction.type:
                User.upsert(payload.member);
                break;
            case updateUsersRecievedAction.type:
                User.upsert(payload.user);
                break;
            default:
                break;
        }
    }
}
