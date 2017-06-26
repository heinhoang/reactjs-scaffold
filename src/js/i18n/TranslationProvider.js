import { Children } from 'react';
import Polyglot from 'node-polyglot';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { withContext, compose } from 'recompose';

import defaultMessages from './messages/defaultMessages';

// Purpose: is to pass a translate function from polyglot to children
const withI18nContext = withContext({
    translate: PropTypes.func.isRequired,
    locale: PropTypes.string.isRequired,
}, ({ locale, messages = {} }) => {
    const userMessages = messages[locale] || [];
    const polyglot = new Polyglot({
        locale,
        phrases: { ...defaultMessages, ...userMessages },
    });
    return {
        locale,
        translate: polyglot.t.bind(polyglot),
    };
});

const TranslationProvider = ({ children }) => Children.only(children);

TranslationProvider.propTypes = {
    locale: PropTypes.string.isRequired, // which laguage? ex: 'en', 'fr',...
    messages: PropTypes.object, // language dictionary
    children: PropTypes.element,
};

const mapStateToProps = state => ({ locale: state.locale });

export default compose(connect(mapStateToProps), withI18nContext)(TranslationProvider);
