import { createSelector } from 'reselect';

const selectRegistration = (state) => state.registration;

export const makeSelectRegistration = () => createSelector(
    selectRegistration,
    (substate) => substate
);
