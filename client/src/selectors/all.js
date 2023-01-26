import { createSelector } from "redux-orm"
import { orm } from "../models/orm";


export const allCategoriesSelector = createSelector(
    orm,
    ({ Category }) => Category.all().toRefArray()
);

export const allTagsSelector = createSelector(
    orm,
    ({ Tag }) => Tag.all().toRefArray()
);