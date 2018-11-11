import { createSelector } from 'reselect';

const selectHomepage = (state) => state.homepage;

export const makeSelectLatestQuestions = () => createSelector(
    selectHomepage,
    (substate) => substate.latestQuestions
);

export const makeSelectLikesQuestions = () => createSelector(
    selectHomepage,
    (substate) => substate.likesQuestions
);

export const makeSelectMostUserAnswer = () => createSelector(
    selectHomepage,
    (substate) => substate.mostAnswerUsers
);

