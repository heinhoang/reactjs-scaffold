import { takeEvery, put, call } from 'redux-saga/effects';
import assert from 'assert';

import AuthSaga from './auth';

const authClient = (login, payload) => ({ login, payload });
const authSaga = AuthSaga(authClient);
// mock
const mockAction = {
    payload: 'userID',
    meta: { auth: true, pathName: '/' },
};
let authSagaMock;

describe('auth Saga: should works', () => {
    beforeEach(() => {
        authSagaMock = authSaga.handleAuth(mockAction);
    });

/*
    it('=> should have function to watch auth action', () => {
        assert.deepEqual(
            authSaga.watchAuthActions().next().value,
            takeEvery(action => action.meta && action.meta.auth, authSaga.handleAuth),
        );
    });
*/

    it('=> In case watching USER_LOGIN action properly', () => {
        mockAction.type = 'USER_LOGIN';

        assert.deepEqual(
            authSagaMock.next().value,
            put({
                type: 'USER_LOGIN_LOADING',
            }),
            'should dispatch USER_LOGIN_LOADING action',
        );

        assert.deepEqual(
            authSagaMock.next().value,
            call(authClient, 'AUTH_LOGIN', mockAction.payload),
            '=> worker should call authClient function',
        );

        const authPayload = authClient('login', 'payload');
        assert.deepEqual(
            authSagaMock.next(authPayload).value,
            put({
                type: 'USER_LOGIN_SUCCESS',
                payload: authPayload,
            }),
            '=> worker should dispatch USER_LOGIN_SUCCESS action',
        );
    });

/*
    // https://github.com/redux-saga/redux-saga/blob/master/docs/basics/ErrorHandling.md
    it('=> In case failure happend', () => {
        const error = {};
        assert.deepEqual(
            authSagaMock.throw(error).value,
            put({
                type: 'USER_LOGIN_FAILURE',
                error: 'meet error',
                meta: {
                    auth: true,
                },
            }),
            '=> worker should dispatch USER_LOGIN_FAILURE action',
        );
    });
*/
});
