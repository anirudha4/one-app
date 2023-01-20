import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga';
import { logger } from 'redux-logger';
import { ormReducer } from './models/orm'
import rootSaga from './shared/sagas';
import auth from './shared/slices/auth'
import router from './shared/slices/router';
import core from './shared/slices/core';

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
        orm: ormReducer,
        router
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware({ thunk: false }).prepend(sagaMiddleware).concat(getCustomMiddlewares());
    }
});

// run saga
sagaMiddleware.run(rootSaga);
