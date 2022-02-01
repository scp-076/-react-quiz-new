import { CORRECT_ANSWER_GIVEN, SAVE_QUIZ, WRONG_ANSWER_GIVEN, CLEAR_RESULTS, QUIZ_FINISHED, SET_LOADING, SET_AMOUNT } from "./actionTypes";
import { getAllQuestions } from "../api/api";
import { Dispatch } from 'redux';
import { Quiz } from "../types";

export const loadQuiz = (amount: Number) => {
    return async (dispatch: Dispatch) => {
        dispatch(setLoading(true));
        await getAllQuestions(amount).then(res => dispatch(saveQuiz(res)));
        dispatch(setLoading(false));
    }
}

const saveQuiz = (quiz: Quiz[]) => ({
    type: SAVE_QUIZ,
    payload: quiz,
});

export const setLoading = (flag: boolean) => ({type: SET_LOADING, payload: flag});

export const setAmount = (amount: number) => ({type: SET_AMOUNT, payload: amount})

export const finishQuiz = (success: boolean) => ({type: QUIZ_FINISHED, payload: success});

export const clearResults = () => ({type: CLEAR_RESULTS});

export const correctAnswerGiven = () => ({type: CORRECT_ANSWER_GIVEN});

export const wrongAnswerGiven = () => ({type: WRONG_ANSWER_GIVEN});