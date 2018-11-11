// ======================================================================================
// Combine all reducers in this file and export the combined reducers.
// If we were to do this in store.js, reducers wouldn't be hot reloadable.
// ======================================================================================

import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

// ======================================================================================
// All application reducers should be imported here
// ======================================================================================

import appReducer from 'containers/App/reducer';

// ======================================================================================
// Global application state
// ======================================================================================

export default function createReducer() {
    return combineReducers({
        app: appReducer,
        router: routerReducer
    });
}
