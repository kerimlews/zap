import { createSelector } from 'reselect';
import { parse } from 'qs';

const selectApp = (state) => state.app;
const selectRouter = (state) => state.router;

export const makeSelectAuthenticated = () => createSelector(
    selectApp,
    (globalState) => globalState.isAuthenticated
);

export const makeSelectInitialized = () => createSelector(
    selectApp,
    (globalState) => globalState.isInitialized
);

export const makeSelectUser = () => createSelector(
    selectApp,
    (globalState) => globalState.user
);

const selectUrlQuery = createSelector(
    selectRouter,
    (router) => router.location ? (router.location.search || '') : ''
);

export const makeSelectUrlParams = () => createSelector(
    selectUrlQuery,
    (query) => parse(query, { ignoreQueryPrefix: true }) || {}
);
