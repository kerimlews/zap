import { createSelector } from 'reselect';

const selectMyQuestions = (state) => state.myQuestions;

export const makeSelectMyQuestions = () => createSelector(
    selectMyQuestions,
    (substate) => substate
);

