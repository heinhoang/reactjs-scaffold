import 'jsdom-global/register';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { shallow } from 'enzyme';
import expect, { creatSpy } from 'expect';
import sinon from 'sinon';
import injectTapEventPlugin from 'react-tap-event-plugin';

import Login from './Login';
import TranslationProvider from '../../i18n/TranslationProvider';

// Needed for onTouchTap
injectTapEventPlugin();

const mockStore = configureStore();
const initialState = {
    locale: 'en',
};
const messages = {
    en: {
        heo: 'geo',
    },
};
const props = {
    location: {},
    spyOnSubmit: sinon.spy(),
};
const store = mockStore(initialState);
const context = {
    store,
    locale: 'en',
    translate: f => (f),
};
let container;

describe('<Login /> should works', () => {
    /* beforeEach(() => {
        store = mockStore(initialState);
        container = mount(
            <Provider store={store}>
                <TranslationProvider messages={messages}>
                    <Login {...props} />
                </TranslationProvider>
            </Provider>,
        );
    });
    it('=> should render itself & children', () => {
        expect(container.length).toEqual(1);
        expect(container.find(Login).length).toEqual(1);
        expect(container.find('MuiThemeProvider').length).toEqual(1);
        expect(container.find('form').length).toEqual(1);
        expect(container.find({ name: 'username' }).length).toEqual(1);
        expect(container.find({ name: 'password' }).length).toEqual(1);
        expect(container.find('RaisedButton').length).toEqual(1);
    });
    it('=> should has children\'s props', () => {
        expect(typeof container.find('form').props().onSubmit).toBe('function');
        expect(typeof container.find('Field').first().props().component).toBe('function');
        expect(typeof container.findWhere(n => n.name() === 'Field' && n.prop('name') === 'password').props().component).toBe('function');
        expect(typeof container.find('RaisedButton').props().label).toBe('string');
    });
    it('=> should call dispatch on form submit', () => {
        // const submitBtn = container.find('RaisedButton');
        // const event = { preventDefault: () => {} };
        // submitBtn.simulate('click', event);
        // expect(props.dispatch.calls.length).toBe(1);
        const logIn = container.dive().setProps(props);
        const form = logIn.find('form');
        form.simulate('submit');
        expect(props.spyOnSubmit.callCount).toEqual(1);
    });*/

    beforeEach(() => {
        // container = shallow(<Login {...props} />, {context});
        container = shallow(
            <Provider store={store}>
                <TranslationProvider messages={messages}>
                    <Login {...props} />
                </TranslationProvider>
            </Provider>,
        ).dive().dive();
    });
    it('=> should render itself & children', () => {
        expect(container.length).toEqual(1);
        expect(container.find('form').length).toEqual(1);
        expect(container.find({ name: 'username' }).length).toEqual(1);
        expect(container.find({ name: 'password' }).length).toEqual(1);
        expect(container.find('RaisedButton').length).toEqual(1);
    });
});
