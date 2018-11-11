import {
    mapLatestQuestions,
    mapQuestionLike,
    mapMostQuestionsLikes,
    mapMostUsersAnswers
} from './models';
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
    CHNAGE_LIKE,
    CHNAGE_LIKE_SUCCESS,
    CHNAGE_LIKE_FAIL,
    CLEAR_LATEST_QUESTIONS
} from './constants';

const initialState = {
    latestQuestions: {
        isLoading: true,
        questions: [],
        errorMessage: ''
    },
    likesQuestions: {
        isLoading: true,
        questions: [],
        errorMessage: ''
    },
    mostAnswerUsers: {
        isLoading: true,
        users: [],
        errorMessage: ''
    }
};

function handleLatestQuestions(state) {
    return {
        ...state,
        latestQuestions: {
            ...state.latestQuestions,
            isLoading: true,
            errorMessage: ''
        }
    };
}

function handleLatestQuestionsSuccess(state, action) {
    return {
        ...state,
        latestQuestions: {
            ...state.latestQuestions,
            isLoading: false,
            questions: state.latestQuestions.questions.concat(mapLatestQuestions(action.data)),
            errorMessage: ''
        }
    };
}

function handleLatestQuestionsFail(state, action) {
    return {
        ...state,
        latestQuestions: {
            ...state.latestQuestions,
            isLoading: false,
            errorMessage: action.data || 'Error while loading data !'
        }
    };
}

function handleLikesQuestions(state) {
    return {
        ...state,
        likesQuestions: {
            ...state.likesQuestions,
            isLoading: true,
            errorMessage: ''
        }
    };
}

function handleLikesQuestionsSuccess(state, action) {
    return {
        ...state,
        likesQuestions: {
            ...state.likesQuestions,
            questions: mapMostQuestionsLikes(action.data),
            isLoading: false,
            errorMessage: ''
        }
    };
}

function handleLikesQuestionsFail(state, action) {
    return {
        ...state,
        likesQuestions: {
            ...state.likesQuestions,
            isLoading: false,
            errorMessage: action.data || 'Error while loading data !'
        }
    };
}

function handleChangeLike(state) {
    return {
        ...state,
        latestQuestions: {
            ...state.latestQuestions,
            isLoading: true,
            errorMessage: ''
        }
    };
}

function handleChangeLikeSuccess(state, action) {
    return {
        ...state,
        latestQuestions: {
            questions: mapQuestionLike(state.questions, action.data),
            isLoading: false,
            errorMessage: ''
        }
    };
}

function handleChangeLikeFail(state, action) {
    return {
        ...state,
        latestQuestions: {
            ...state.latestQuestions,
            isLoading: false,
            errorMessage: action.data
        }
    };
}

function handleUserAnswers(state) {
    return {
        ...state,
        mostAnswerUsers: {
            ...state.mostAnswerUsers,
            isLoading: true,
            errorMessage: ''
        }
    };
}

function handleUserAnswersSuccess(state, action) {
    return {
        ...state,
        mostAnswerUsers: {
            ...state.mostAnswerUsers,
            users: mapMostUsersAnswers(action.data),
            isLoading: false,
            errorMessage: ''
        }
    };
}

function handleUserAnswersFail(state, action) {
    return {
        ...state,
        mostAnswerUsers: {
            ...state.mostAnswerUsers,
            isLoading: false,
            errorMessage: action.data || 'Error while loading data !'
        }
    };
}

function handleClearLatestQuestions(state) {
    return {
        ...state,
        latestQuestions: {
            ...state.latestQuestions,
            questions: [],
            isLoading: true
        }
    };
}

function homepageReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_LATEST_QUESTIONS:
            return handleLatestQuestions(state);
        case FETCH_LATEST_QUESTIONS_SUCCESS:
            return handleLatestQuestionsSuccess(state, action);
        case FETCH_LATEST_QUESTIONS_FAIL:
            return handleLatestQuestionsFail(state, action);
        case FETCH_QUESTIONS_WITH_MOST_LIKES:
            return handleLikesQuestions(state);
        case FETCH_QUESTIONS_WITH_MOST_LIKES_SUCCESS:
            return handleLikesQuestionsSuccess(state, action);
        case FETCH_QUESTIONS_WITH_MOST_LIKES_FAIL:
            return handleLikesQuestionsFail(state, action);
        case FETCH_USERS_WITH_MOST_ANSWERS:
            return handleUserAnswers(state);
        case FETCH_USERS_WITH_MOST_ANSWERS_SUCCESS:
            return handleUserAnswersSuccess(state, action);
        case FETCH_USERS_WITH_MOST_ANSWERS_FAIL:
            return handleUserAnswersFail(state, action);
        case CHNAGE_LIKE:
            return handleChangeLike(state);
        case CHNAGE_LIKE_SUCCESS:
            return handleChangeLikeSuccess(state, action);
        case CHNAGE_LIKE_FAIL:
            return handleChangeLikeFail(state, action);
        case CLEAR_LATEST_QUESTIONS:
            return handleClearLatestQuestions(state);
        default:
            return state;
    }
}

export default homepageReducer;
