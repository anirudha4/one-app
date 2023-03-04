import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga';
import { logger } from 'redux-logger';
import { ormReducer } from './models/orm'
import rootSaga from './shared/sagas';
import auth from './shared/slices/auth'
import router from './shared/slices/router';
import core from './shared/slices/core';
import tag from './shared/slices/tag';
import transaction from './shared/slices/transaction';
import splitwise from './shared/slices/splitwise';
import filter from './shared/slices/filter';

// create saga middleware
const sagaMiddleware = createSagaMiddleware();

// get custom middlewares
const getCustomMiddlewares = () => {
    return [
        logger
    ]
}

export const store = configureStore({
    reducer: {
        core,
        auth,
        tag,
        transaction,
        splitwise,
        filter,
        orm: ormReducer,
        router,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware({ thunk: false }).prepend(sagaMiddleware).concat(getCustomMiddlewares());
    }
});

// run saga
sagaMiddleware.run(rootSaga);
