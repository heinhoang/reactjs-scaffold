import React from 'react';
// import expect from 'expect';
import assert from 'assert';
// import { shallow } from 'enzyme';

import translate from './translate';

let Component;
let TranslatedComponent;
// let container;
describe('translate component', () => {
    beforeEach(() => {
        Component = () => <div><div>heo</div></div>;
        Component.defaultProps = { foo: 'bar' };
        TranslatedComponent = translate(Component);
        // container = shallow(<TranslatedComponent />);
    });
    it('should render passed component & conserve default props', () => {
        // expect(container.is('div')).toBe(true);
        assert.deepEqual(TranslatedComponent.defaultProps, { foo: 'bar' });
    });
});
