// Needed for redux-saga es6 generator support
import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';

// We need to import our css files in javascript because that's how webpack works
// These will be extracted to a separate file in production
import 'sass/bundles/styles.scss';

// Import root app
import App from 'containers/App';

// Import selector for `syncHistoryWithStore`
import configureStore from './store';

// Create redux store with history
// this uses the singleton browserHistory provided by react-router
// Optionally, this could be changed to leverage a created history
// e.g. `const browserHistory = useRouterHistory(createBrowserHistory)();`
const initialState = {};
const history = createHistory();
const store = configureStore(initialState, history);

const render = (Component) => {
    ReactDOM.render(
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <Component />
            </ConnectedRouter>
        </Provider>,
        document.getElementById('app')
    );
};

// modules.hot.accept does not accept dynamic dependencies,
// have to be constants at compile-time
if (module.hot)
    module.hot.accept('./containers/App', () => {
        const NextApp = require('./containers/App').default; // eslint-disable-line global-require
        render(NextApp);
    });

render(App);