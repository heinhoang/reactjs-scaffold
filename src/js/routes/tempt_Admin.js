import React, { createElement } from 'react';
import PropTypes from 'prop-types';
import { combineReducers, createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createHistory from 'history/createHashHistory';
import { Switch, Route } from 'react-router-dom';
import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import createSagaMiddleware from 'redux-saga';
import { fork } from 'redux-saga/effects';

import { USER_LOGOUT } from '../actions/authActions';
import adminReducer from './reducer';
import localeReducer from './reducer/locale';
import { crudSaga } from './saga';
import DefaultLayout from './containers/layout/Layout';
import Menu from './components/layout/Menu';
import Login from './components/auth/Login';
import Logout from './components/auth/Logout';
import TranslationProvider from './i18n/TranslationProvider';

const Admin = ({
    appLayout,
    authClient,
    children,
    customReducers = {},
    customSagas = [],
    customRoutes,
    dashboard,
    locale,
    messages = {},
    menu,
    restClient,
    theme,
    title = 'Admin on REST',
    loginPage,
    logoutButton,
    initialState,
}) => {
    // Get all props from Resource component
    const resources = React.Children.map(children, ({ props }) => props) || [];

    // Reducer
    const appReducer = combineReducers({
        admin: adminReducer(resources),
        locale: localeReducer(locale),
        form: formReducer,
        routing: routerReducer,
        ...customReducers,
    });

    // Reset state whenever user logout, know more: https://stackoverflow.com/questions/35622588/how-to-reset-the-state-of-a-redux-store
    const resettableAppReducer = (state, action) => appReducer(action.type !== USER_LOGOUT ? state : undefined, action);

    // Saga config
    const saga = function* rootSaga() {
        yield [
            crudSaga(restClient, authClient),
            ...customSagas,
        ].map(fork);
    };

    // Store config
    const sagaMiddleware = createSagaMiddleware();
    const history = createHistory();
    const store = createStore(resettableAppReducer, initialState, compose(
        applyMiddleware(sagaMiddleware, routerMiddleware(history)),
        window.devToolsExtension ? window.devToolsExtension() : f => f,
    ));
    sagaMiddleware.run(saga);

    // If prop authClient (that means authentication needed), we create a logout button
    const logout = authClient ? createElement(logoutButton || Logout) : null;

    return (
        <Provider store={store}>
            <TranslationProvider messages={messages}>
                <ConnectedRouter history={history}>
                    <div>
                        <Switch>
                            <Route
                                exact
                                path="/login"
                                render={({ location }) => createElement(loginPage || Login, {
                                    location,
                                    title,
                                    theme,
                                })}
                            />
                            <Route
                                path="/"
                                render={() => createElement(appLayout || DefaultLayout, {
                                    dashboard,
                                    customRoutes,
                                    menu: createElement(menu || Menu, {
                                        logout,
                                        resources,
                                        hasDashboard: !!dashboard,
                                    }),
                                    resources,
                                    title,
                                    theme,
                                })}
                            />
                        </Switch>
                    </div>
                </ConnectedRouter>
            </TranslationProvider>
        </Provider>
    );
};

const componentPropType = PropTypes.oneOfType([PropTypes.func, PropTypes.string]);

Admin.propTypes = {
    appLayout: componentPropType,
    authClient: PropTypes.func,
    children: PropTypes.node,
    customSagas: PropTypes.array,
    customReducers: PropTypes.object,
    customRoutes: PropTypes.array,
    dashboard: componentPropType,
    loginPage: componentPropType,
    logoutButton: componentPropType,
    menu: componentPropType,
    restClient: PropTypes.func,
    theme: PropTypes.object,
    title: PropTypes.node,
    locale: PropTypes.string,
    messages: PropTypes.object,
    initialState: PropTypes.object,
};

export default Admin;
