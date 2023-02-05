import { eventChannel } from 'redux-saga';
import { all, call, cancelled, put, take, takeEvery } from 'redux-saga/effects';
import { createAction } from "@reduxjs/toolkit";
import socket from '../../api/socket';
import { updateUsersRecievedAction } from '../actions/entry/users';

// actions
const socketDisconnect = createAction('socket/disconnect')
const socketReconnect = createAction('socket/reconnect');

const createSocketEventsChannel = () =>
    eventChannel((emit) => {
        const handleDisconnect = () => {
            console.log('disconnected');
            // emit(entryActions.handleSocketDisconnect());
        };

        const handleReconnect = () => {
            console.log('reconnecting');
            // emit(entryActions.handleSocketReconnect());
        };

        const handleUserCreate = ({ item }) => {
            console.log('user created');
            // emit(entryActions.handleUserCreate(item));
        };

        const handleUserUpdate = ({ item }) => {
            emit(updateUsersRecievedAction({ user: item }));
        }

        socket.on('disconnect', handleDisconnect);
        socket.on('reconnect', handleReconnect);

        // users
        socket.on('userCreate', handleUserCreate);
        socket.on('userUpdate', handleUserUpdate);

        return () => {
            socket.off('disconnect', handleDisconnect);
            socket.off('reconnect', handleReconnect);

            // users
            socket.off('userCreate', handleUserCreate);
            socket.off('userUpdate', handleUserUpdate);
        };
    });

export default function* socketWatchers() {
    yield all([
        yield takeEvery(socketDisconnect.type, () =>
            console.log('disconnected...')
            // services.handleSocketDisconnect(),
        ),
        yield takeEvery(socketReconnect.type, () =>
            console.log('reconnecting...')
            // services.handleSocketReconnect(),
        ),
    ]);

    const socketEventsChannel = yield call(createSocketEventsChannel);

    try {
        while (true) {
            const action = yield take(socketEventsChannel);
            yield put(action);
        }
    } finally {
        if (yield cancelled()) {
            socketEventsChannel.close();
        }
    }
}