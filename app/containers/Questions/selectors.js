import { createSelector } from 'reselect';

const selectHomepage = (state) => state.questions;

export const makeSelectAllQuestions = () => createSelector(
    selectHomepage,
    (substate) => substate.allQuestions
);

export const makeSelectAllAnswers = () => createSelector(
    selectHomepage,
    (substate) => substate.allAnswers
);

