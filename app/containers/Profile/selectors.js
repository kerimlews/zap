import { createSelector } from 'reselect';

const selectProfile = (state) => state.profile;

export const makeSelectProfile = () => createSelector(
    selectProfile,
    (substate) => substate
);

