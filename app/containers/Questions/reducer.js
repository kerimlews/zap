import {
    mapQuestions,
    mapAnswers
} from './models';
import {
    FETCH_ALL_ANSWERS,
    FETCH_ALL_ANSWERS_FAIL,
    FETCH_ALL_ANSWERS_SUCCESS,
    FETCH_ALL_QUESTIONS,
    FETCH_ALL_QUESTIONS_FAIL,
    FETCH_ALL_QUESTIONS_SUCCESS,
    CHNAGE_LIKE_ANSWER,
    CHNAGE_LIKE_ANSWER_FAIL,
    CHNAGE_LIKE_QUESTION,
    CHNAGE_LIKE_QUESTION_FAIL,
    SAVE_ANSWER,
    SAVE_ANSWER_FAIL
} from './constants';

const initialState = {
    allQuestions: {
        isLoading: true,
        questions: [],
        errorMessage: ''
    },
    allAnswers: {
        isLoading: true,
        answers: [],
        errorMessage: ''
    }
};

function handleAllQuestions(state) {
    return {
        ...state,
        allQuestions: {
            ...state.allQuestions,
            isLoading: true,
            errorMessage: ''
        }
    };
}

function handleAllQuestionsSuccess(state, action) {
    return {
        ...state,
        allQuestions: {
            ...state.allQuestions,
            questions: mapQuestions(action.data),
            isLoading: false,
            errorMessage: ''
        }
    };
}

function handleAllQuestionsFail(state, action) {
    return {
        ...state,
        allQuestions: {
            ...state.allQuestions,
            isLoading: false,
            errorMessage: action.data || 'Error while loading data !'
        }
    };
}

function handleAllAnswers(state) {
    return {
        ...state,
        allAnswers: {
            ...state.allAnswers,
            isLoading: true,
            errorMessage: ''
        }
    };
}

function handleAllAnswersSuccess(state, action) {
    return {
        ...state,
        allAnswers: {
            ...state.allAnswers,
            answers: mapAnswers(action.data),
            isLoading: false,
            errorMessage: ''
        }
    };
}

function handleAllAnswersFail(state, action) {
    return {
        ...state,
        allAnswers: {
            ...state.allAnswers,
            isLoading: false,
            errorMessage: action.data || 'Error while loading data !'
        }
    };
}

function handleChangeLikeQuestion(state) {
    return {
        ...state,
        allQuestions: {
            ...state.allQuestions,
            isLoading: false,
            errorMessage: ''
        }
    };
}


function handleChangeLikeQuestionFail(state, action) {
    return {
        ...state,
        allQuestions: {
            ...state.allQuestions,
            isLoading: false,
            errorMessage: action.data
        }
    };
}

function handleChangeLikeAnswer(state) {
    return {
        ...state,
        allAnswers: {
            ...state.allAnswers,
            isLoading: false,
            errorMessage: ''
        }
    };
}

function handleChangeLikeAnswerFail(state, action) {
    return {
        ...state,
        allAnswers: {
            ...state.allAnswers,
            isLoading: false,
            errorMessage: action.data
        }
    };
}

function handleSaveAnswer(state) {
    return {
        ...state,
        allAnswers: {
            ...state.allAnswers,
            isLoading: true,
            errorMessage: ''
        }
    };
}

function handleSaveAnswerFail(state, action) {
    return {
        ...state,
        allAnswers: {
            ...state.allAnswers,
            isLoading: false,
            errorMessage: action.data
        }
    };
}

function questionsReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_ALL_QUESTIONS:
            return handleAllQuestions(state);
        case FETCH_ALL_QUESTIONS_SUCCESS:
            return handleAllQuestionsSuccess(state, action);
        case FETCH_ALL_QUESTIONS_FAIL:
            return handleAllQuestionsFail(state, action);
        case FETCH_ALL_ANSWERS:
            return handleAllAnswers(state);
        case FETCH_ALL_ANSWERS_SUCCESS:
            return handleAllAnswersSuccess(state, action);
        case FETCH_ALL_ANSWERS_FAIL:
            return handleAllAnswersFail(state, action);
        case CHNAGE_LIKE_QUESTION:
            return handleChangeLikeQuestion(state);
        case CHNAGE_LIKE_QUESTION_FAIL:
            return handleChangeLikeQuestionFail(state, action);
        case CHNAGE_LIKE_ANSWER:
            return handleChangeLikeAnswer(state);
        case CHNAGE_LIKE_ANSWER_FAIL:
            return handleChangeLikeAnswerFail(state, action);
        case SAVE_ANSWER:
            return handleSaveAnswer(state);
        case SAVE_ANSWER_FAIL:
            return handleSaveAnswerFail(state, action);
        default:
            return state;
    }
}

export default questionsReducer;
