import { SAVE_QUIZ} from "../../actions/actionTypes";
import { Action, Quiz } from "../../types";

const initialState: Quiz[] = [
    {
        question: '',
        correct_answer: '',
        incorrect_answers: [],
    },
];

export default function baseReducer(state: Quiz[] = initialState, action: Action) {
    switch (action.type) {
        case SAVE_QUIZ:
            return action.payload;
        default: return state;    
    }
}