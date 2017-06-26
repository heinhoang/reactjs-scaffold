import expect from 'expect';

import localeReducer from './locale';
import { CHANGE_LOCALE } from '../actions/localeActions';

const initialState = 'en';
let action = {
    type: 'none',
    payload: 'none',
};
let payload;
describe('localeReducer: should return initial State or payload from action', () => {
    it('reducer is a function', () => {
        expect(typeof localeReducer(initialState)).toEqual('function');
    });

    it('should return initial state', () => {
        payload = localeReducer(initialState)(initialState, action);
        expect(payload).toEqual(initialState);
    });

    it('should return payload', () => {
        action = {
            type: CHANGE_LOCALE,
            payload: 'fr',
        };
        payload = localeReducer(initialState)(initialState, action);
        expect(payload).toEqual(action.payload);
    });
});

