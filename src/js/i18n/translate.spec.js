import 'jsdom-global/register';
import React from 'react';
import expect from 'expect';
import assert from 'assert';
import { mount } from 'enzyme';

import translate from './translate';

const context = {
    locale: 'en',
    translate: f => (f),
};
let container;
let Component;
let TranslatedComponent;
describe('<Translate /> should work', () => {
    beforeEach(() => {
        Component = () => <div><div>heo</div></div>;
        Component.defaultProps = { foo: 'bar' };
        TranslatedComponent = translate(Component);
        container = mount(<TranslatedComponent />, { context });
    });
    it('=> should render itself & passed component', () => {
        // expect(container.is('div')).toBe(true);
        expect(container.length).toEqual(1);
        expect(container.find('div').length).toEqual(2);
    });
    it('=> should conserve default props', () => {
        assert.deepEqual(TranslatedComponent.defaultProps, { foo: 'bar' });
    });
    it('=> should has context', () => {
        expect(container.context().locale).toEqual(context.locale);
        expect(container.context().translate).toEqual(context.translate);
    });
});
