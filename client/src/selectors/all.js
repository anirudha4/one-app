import { createSelector } from "redux-orm"
import { orm } from "../models/orm";


export const allCategoriesSelector = createSelector(
    orm,
    ({ Category }) => Category.all().toRefArray()
);