import React from 'react';
import { PropTypes } from 'prop-types';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import createHistory from 'history/createHashHistory';
import { Provider } from 'react-redux';
import { routerReducer, routerMiddleware, ConnectedRouter } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';

import USER_LOGOUT from '../actions/authActions';
import TranslationProvider from '../i18n/TranslationProvider';
import localReducer from '../reducer/locale';


const Admin = ({
    locale, // language. Ex: 'en', 'fr',...
    messages, // laguage dictionary
    initialState,
}) => {
    // config reducer
    const appReducer = combineReducers({
        routing: routerReducer,
        form: formReducer,
        locale: localReducer(locale),
    });
    // Reset state whenever user logout, know more: https://stackoverflow.com/questions/35622588/how-to-reset-the-state-of-a-redux-store
    const resettableAppReducer = (state, action) => appReducer(action.type !== USER_LOGOUT ? state : undefined, action);

    // config saga

    // config history
    const history = createHistory();

    // config store
    const store = createStore(resettableAppReducer, initialState, compose(
      applyMiddleware(routerMiddleware(history)),
      window.devToolsExtension ? window.devToolsExtension() : f => f,
    ));

    return (
        <Provider store={store}>
            <TranslationProvider messages={messages}>
                <ConnectedRouter history={history} />
            </TranslationProvider>
        </Provider>
    );
};

Admin.propTypes({
    locale: PropTypes.string.isRequired,
    messages: PropTypes.object,
    initialState: PropTypes.object,
});

export default Admin;
