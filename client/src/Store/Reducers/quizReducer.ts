import { CORRECT_ANSWER_GIVEN, GET_QUESTION, WRONG_ANSWER_GIVEN, QUIZ_FINISHED, CLEAR_RESULTS, SET_LOADING, SET_AMOUNT } from "../../actions/actionTypes";
import { Action, quizState } from "../../types";


const initialState: quizState = {
    isLoading: false,
    currentQuestion: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
    quizFinished: false,
    success: false,
    questionsAmount: 10,
}

export default function quizReducer(state: quizState = initialState, action: Action) {
    switch (action.type) {
        case SET_LOADING:
            return {
                ...state,
                 isLoading: action.payload,
            }
        case SET_AMOUNT: 
            return {
                ...state,
                questionsAmount: action.payload,
            }
        case GET_QUESTION:
            return {
                ...state,
                currentQuestion: state.currentQuestion + 1,
            }
        
        case CORRECT_ANSWER_GIVEN:
            return {
                ...state,
                currentQuestion: state.currentQuestion + 1,
                correctAnswers: state.correctAnswers + 1,
            }

        case WRONG_ANSWER_GIVEN:
            return {
                ...state,
                currentQuestion: state.currentQuestion + 1,
                wrongAnswers: state.wrongAnswers + 1,
            }
        case QUIZ_FINISHED:
            return {
                ...state,
                quizFinished: true,
                success: action.payload,
            }
        case CLEAR_RESULTS:
            return {
                ...state,
                correctAnswers: 0,
                wrongAnswers: 0,
                quizFinished: false,
            }

        default: return state;
    }
}