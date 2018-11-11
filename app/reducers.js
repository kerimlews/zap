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
import homepageReducer from 'containers/Homepage/reducer';
import loginReducer from 'containers/Login/reducer';
import myQuestionsReducer from 'containers/MyQuestions/reducer';
import profileReducer from 'containers/Profile/reducer';
import questionsReducer from 'containers/Questions/reducer';
import registrationReducer from 'containers/Registration/reducer';

// ======================================================================================
// Global application state
// ======================================================================================

export default function createReducer() {
    return combineReducers({
        router: routerReducer,
        app: appReducer,
        homepage: homepageReducer,
        login: loginReducer,
        myQuestions: myQuestionsReducer,
        profile: profileReducer,
        questions: questionsReducer,
        registration: registrationReducer
    });
}
