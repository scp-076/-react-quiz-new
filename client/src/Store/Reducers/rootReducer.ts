import {combineReducers} from "redux";
import baseReducer from "./baseReducer";
import quizReducer from "./quizReducer";

export default combineReducers({
    base: baseReducer,
    quiz: quizReducer,
});