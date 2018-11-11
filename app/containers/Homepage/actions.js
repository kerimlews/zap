import {
    FETCH_LATEST_QUESTIONS,
    FETCH_LATEST_QUESTIONS_FAIL,
    FETCH_LATEST_QUESTIONS_SUCCESS,
    FETCH_QUESTIONS_WITH_MOST_LIKES,
    FETCH_QUESTIONS_WITH_MOST_LIKES_FAIL,
    FETCH_QUESTIONS_WITH_MOST_LIKES_SUCCESS,
    FETCH_USERS_WITH_MOST_ANSWERS,
    FETCH_USERS_WITH_MOST_ANSWERS_FAIL,
    FETCH_USERS_WITH_MOST_ANSWERS_SUCCESS,
    CLEAR_LATEST_QUESTIONS,
    CHNAGE_LIKE_SUCCESS,
    CHNAGE_LIKE,
    CHNAGE_LIKE_FAIL
} from './constants';

export function fetchLatestQuestions(loadcount) {
    return {
        type: FETCH_LATEST_QUESTIONS,
        loadcount
    };
}

export function fetchLatestQuestionsSuccess(data) {
    return {
        type: FETCH_LATEST_QUESTIONS_SUCCESS,
        data
    };
}

export function fetchLatestQuestionsFail() {
    return {
        type: FETCH_LATEST_QUESTIONS_FAIL
    };
}

export function fetchQuestionsWithMostLikes() {
    return {
        type: FETCH_QUESTIONS_WITH_MOST_LIKES
    };
}

export function fetchQuestionsWithMostLikesSuccess(data) {
    return {
        type: FETCH_QUESTIONS_WITH_MOST_LIKES_SUCCESS,
        data
    };
}

export function fetchQuestionsWithMostLikesFail() {
    return {
        type: FETCH_QUESTIONS_WITH_MOST_LIKES_FAIL
    };
}

export function fetchUsersWithMostAnswers() {
    return {
        type: FETCH_USERS_WITH_MOST_ANSWERS
    };
}

export function fetchUsersWithMostAnswersSuccess(data) {
    return {
        type: FETCH_USERS_WITH_MOST_ANSWERS_SUCCESS,
        data
    };
}

export function fetchUsersWithMostAnswersFail() {
    return {
        type: FETCH_USERS_WITH_MOST_ANSWERS_FAIL
    };
}

export function changeLike(userId, questionId, like) {
    return {
        type: CHNAGE_LIKE,
        userId,
        questionId,
        like
    };
}

export function changeLikeSuccess(data) {
    return {
        type: CHNAGE_LIKE_SUCCESS,
        data
    };
}

export function changeLikeFail(data) {
    return {
        type: CHNAGE_LIKE_FAIL,
        data
    };
}

export function clearLatestQuestions() {
    return {
        type: CLEAR_LATEST_QUESTIONS
    };
}
