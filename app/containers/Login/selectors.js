import { createSelector } from 'reselect';

const selectLogin = (state) => state.login;

export const makeLoginSelect = () => createSelector(
    selectLogin,
    (substate) => substate
);

