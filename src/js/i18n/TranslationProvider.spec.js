import React from 'react';
import configureStore from 'redux-mock-store';
import expect from 'expect';
import { shallow } from 'enzyme';

import TranslationProvider from './TranslationProvider';

const messages = {
    fr: { search: 'Search' },
    en: { search: 'Search' },
};
const initialState = { locale: 'en' };
const mockStore = configureStore();
const props = {
    messages,
};
let store;
let container;

describe('Test TranslationProvider', () => {
    beforeEach(() => {
        store = mockStore(initialState);
        container = shallow(<TranslationProvider store={store} {...props}><div>demo</div></TranslationProvider>);
    });

    it('should render self and subcomponents', () => {
        expect(container.length).toEqual(1);
        expect(container.find('div').length).toEqual(1);
        expect(container.props().locale).toEqual(initialState.locale);
        expect(container.props().messages).toEqual(messages);
        // expect(typeof container.props().translate).toEqual('function');
    });
});
