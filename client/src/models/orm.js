import { ORM, createReducer } from "redux-orm";
import * as models from '.';

// Create an ORM instance and hook up the models
const orm = new ORM({ stateSelector: (state) => state.orm });

// useful if importing models as a file
const spreadableModels = Object.values(models);

// register the models in orm
orm.register(...spreadableModels);

// create reducer
const ormReducer = createReducer(orm);

// exports
export { orm, ormReducer };
export default orm;
